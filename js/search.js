    function searchEntries(query) {
      const entries = [];
      const pushGameServices = game => {
        if (!game || !game.services) return;
        game.services.forEach(service => {
          const category = game.categories?.find(cat => cat.id === service.category)?.label || service.category;
          const haystack = [service.title, service.cardTitle, service.short, service.intro, service.category, category, service.form, game.label].join(" ").toLowerCase();
          if (haystack.includes(query)) {
            entries.push({
              type: "service",
              gameId: game.id,
              serviceId: service.id,
              categoryId: service.category,
              title: service.cardTitle,
              meta: `${game.label} / ${category} / ${service.cardTitle}`
            });
          }
        });
      };
      pushGameServices(games.find(g => g.id === "arc"));
      pushGameServices(games.find(g => g.id === "valorant"));
      pushGameServices(games.find(g => g.id === "wow"));
      pushGameServices(games.find(g => g.id === "circle"));
      pushGameServices(games.find(g => g.id === "lol"));
      pushGameServices(games.find(g => g.id === "faceit"));
      pushGameServices(games.find(g => g.id === "premier"));
      pushGameServices(games.find(g => g.id === "social"));
      const pushCategoryHits = game => {
        if (!game || !game.categories?.length) return;
        game.categories.forEach(cat => {
          const lab = ui(cat.label).toLowerCase();
          if (cat.id.toLowerCase().includes(query) || lab.includes(query)) {
            entries.push({
              type: "category",
              gameId: game.id,
              categoryId: cat.id,
              title: ui(cat.label),
              meta: `${game.label} / ${ui(cat.label)}`
            });
          }
        });
      };
      pushCategoryHits(games.find(g => g.id === "valorant"));
      pushCategoryHits(games.find(g => g.id === "wow"));
      Object.entries(blueprintGroups).forEach(([tab, names]) => {
        const matches = names.filter(name => name.toLowerCase().includes(query) || trName(name).toLowerCase().includes(query));
        if (matches.length) {
          entries.push({
            type: "blueprint",
            serviceId: "blueprints",
            categoryId: "blueprints",
            bpTab: tab,
            bpQuery: query,
            title: tab,
            meta: `Blueprints / ${matches.slice(0, 3).join(", ")}${matches.length > 3 ? "..." : ""}`
          });
        }
      });
      return entries.slice(0, 10);
    }

    function openSearchResult(entry) {
      state.game = entry.gameId || "arc";
      state.category = entry.categoryId;
      if (entry.type === "category") {
        const g = games.find(x => x.id === state.game);
        state.serviceId = g?.services.find(s => s.category === state.category)?.id ?? null;
      } else {
        state.serviceId = entry.serviceId;
      }
      if (entry.type === "blueprint") state.pendingBlueprintSearch = { tab: entry.bpTab, query: entry.bpQuery };
      $("siteSearchResults").classList.remove("active");
      syncGameHash(state.game);
      renderAll();
      ($("detailLeftHead") || $("detailSection")).scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function renderSiteSearchResults(entries, query) {
      const box = $("siteSearchResults");
      if (!query) {
        box.classList.remove("active");
        box.innerHTML = "";
        return;
      }
      if (!entries.length) {
        box.innerHTML = `<div class="search-empty-card" role="status"><strong>No matching services found.</strong><span>Try another keyword or open a custom order.</span></div>`;
        box.classList.add("active");
        return;
      }
      box.innerHTML = entries.map((entry, index) => `
        <button class="search-result-btn" type="button" data-search-index="${index}">
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${escapeHtml(entry.meta)}</span>
        </button>
      `).join("");
      box.classList.add("active");
      box.querySelectorAll("[data-search-index]").forEach(button => {
        button.addEventListener("click", () => openSearchResult(entries[Number(button.dataset.searchIndex)]));
      });
    }

    function runSiteSearch() {
      const query = val("siteSearch").trim().toLowerCase();
      if (!query) return;
      const entries = searchEntries(query);
      if (entries.length === 1) return openSearchResult(entries[0]);
      renderSiteSearchResults(entries, query);
    }
