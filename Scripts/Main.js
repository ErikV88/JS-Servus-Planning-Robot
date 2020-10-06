$('#go').click(function () {
    var start = {
        "loc": 'K',
        "s_full": 0,
        "s_empty": 0,
        "t1_full": 1,
        "t1_empty": 1,
        "t2_full": 1,
        "t2_empty": 1
    };
    var space = new ServusSpace(),
        start_state = new ServusState(start);
    var servus = new ServusUI(start_state.get_state());

    var result = space.solve(start_state);

    if (!result) {
        console.log('No solution')
    } else {
        console.log('Solution: ')
        console.log(result.toString());
        $('#go').hide();
        servus.run(result, 0);

    }
});