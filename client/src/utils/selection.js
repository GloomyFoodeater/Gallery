export function resetSelection(selectionContext) {
    const {setSelectionMode, setSelection, setNextSelectAll} = selectionContext;
    setSelectionMode(false);
    setSelection(new Set());
    setNextSelectAll(true);
    window.scrollTo(0, 0);
}