# View Persistence Fix Tracker
**Status: 0/4 Complete** | Approved Plan

## Steps:

### [ ] 1. Create this TODO.md ✅ **DONE**

### [ ] 2. Add localStorage to window.setView()
```
localStorage.setItem('jv_current_view', viewName);
```

### [ ] 3. Fix DOMContentLoaded load logic
```
const savedView = localStorage.getItem('jv_current_view') || hash || 'dashboard';
window.setView(savedView, false);
```

### [ ] 4. Remove forced dashboard from auth callbacks (4 locations)

### [ ] 5. Test refresh persistence
- Feed → refresh → stays on feed
- Portfolio → refresh → stays  
- Login on any page → preserves view

### [ ] 6. Update progress + attempt_completion

**Files:** index.html (multi-edit)
**Next:** Edit index.html
