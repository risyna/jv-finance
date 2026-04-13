// Fixed retryCommentSync - complete implementation
window.retryCommentSync = async (optimisticId) => {
    console.log('Retrying sync for ID:', optimisticId);
    
    // Extract data from local comment
    const comments = appData.postComments[currentPostIdForComment] || [];
    const localComment = comments.find(c => c.id === optimisticId);
    if (!localComment) {
        alert('Local comment not found');
        return;
    }
    
    // Trigger fresh sync with original text
    const input = document.getElementById('detail-comment-input');
    if (input) {
        input.value = localComment.text;
        await window.sendDetailComment();
    } else {
        alert('Comment input not found - refresh page');
    }
};
