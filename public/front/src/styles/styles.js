const styles = {
    container: 'container bg-slate-100 h-screen w-full flex flex-col items-center text-slate-500',
    dashboardDiv: 'w-full font-bold flex justify-left items-left text-2xl',
    main: 'flex flex-col justify-between w-full text-xl',
    searchIcon: "input__span absolute z-4 top-5 left-3 text-slate-200",
    input: 'input relative rounded bg-white w-full h-10 pl-10 align-middle',
    inputResults: "input__span_right absolute z-3 top-3 right-5 text-slate-300",
    emptyBoardStyle: 'main__empty-board flex flex-col justify-center items-center text-center text-2xl mt-50',
    titleListStyle: 'main__titles-list grid grid-cols-8 w-full gap-3',
    testListStyle: 'main__test-list flex flex-col justify-between w-full gap-3',
}

export default styles;