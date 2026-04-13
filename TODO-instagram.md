# JV Finance Instagram Transformation
Status: 🚀 **Plan Approved - 0/12 Steps Complete**

## High-Level Goal
Transform social features to Instagram-like (public feed + comments + profile layout) while preserving finance core (dashboard/books/library). Bug-free login/feed/comments.

## Detailed Implementation Steps:

### 1. **✅ PLAN APPROVED & TODO CREATED**

### 2. **Fix Remaining Bugs** (Critical)
   - sendDetailComment(): Update db_synced=true after DB success → remove permanent ⏳
   - logout(): Confirm localStorage.clear() → reset appData → supabase.signOut() → updateUI(), NO reload

### 3. **Instagram Feed Polish**
   - Infinite scroll (IntersectionObserver, paginated renderFeed(pageSize=6))
   - Relative timestamps (getRelativeTime + auto-update interval)
   - Feed cards: Heart button (fill state based liked_by), like count, double-click → like animation + heart burst

### 4. **Instagram Profile Layout**
   - Replace tabs: Large profile pic + stories ring → bio/username/highlights row → masonry photo grid (CSS grid responsive)
   - Mock followers count (localStorage), edit bio inline

### 5. **Comments Instagram-style**
   - Nested replies (@author auto-focus)
   - Emoji picker button/modal (common emojis)

### 6. **Likes System Complete**
   - toggleLike(): Local + Supabase sync (post_likes table upsert)
   - Multi-tab real-time sync (broadcast channel or polling)

### 7. **UI/UX Polish**
   - Dark mode toggle (settings → CSS variables + body class)
   - Loading spinners/guards everywhere (anti-infinite loops)
   - Smooth transitions (view changes, modals)

### 8. **Preserve Finance Core**
   - Dashboard/portfolio/library sections unchanged
   - Nav preserved (finance tabs active)

### 9. **Testing Checklist**
```
✅ Feed infinite scroll → loads more
✅ Double-click like → animation + count
✅ Profile masonry responsive mobile/desktop
✅ Comments: optimistic → synced → nested replies
✅ Login/logout seamless (no data restore)
✅ Multi-tab: likes/comments sync
✅ Offline-first (cache shows immediately)
```

### 10. **Update Progress TODOs**
   - Mark TODO-instagram-social.md, TODO-bugfix-progress.md complete sections

### 11. **Final Polish**
   - Mobile responsiveness (tailwind tweaks)
   - Performance: lazy load images, virtual scroll if needed

### 12. **Production Ready → attempt_completion**

**Next: Step 2 - Fix bugs in index.html (sendDetailComment db_synced + logout sequence)**

**Progress Tracker:**
- [ ] Step 2 Bugs Fixed
- [ ] Step 3 Feed Instagram-style
- [ ] Step 4 Profile Layout
- [ ] Step 5 Comments Polish
- [ ] Step 6 Likes Complete
- [ ] Step 7 UI Polish
- [ ] Step 8 Finance Preserved (always)
- [ ] Step 9 Tests Passed
- [ ] Step 10 TODOs Updated
- [ ] Step 11 Polish
- [ ] Step 12 Complete ✅
