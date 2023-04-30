export function resetSelection(selectionContext) {
    const {setSelectionMode, setSelection, setNextSelectAll} = selectionContext;
    setSelectionMode(false);
    setSelection({});
    setNextSelectAll(true);
    window.scrollTo(0, 0);
}