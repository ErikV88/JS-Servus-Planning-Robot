class ServusUI {
    states = {
        K: {
            'top': 51,
            'left': 152
        },
        T1: {
            'top': 159,
            'left': 152,
        },
        T2: {
            'top': 226,
            'left': 152
        }
    };

    constructor(solution) {
        var vThat = this;
        $(function () {
            vThat.fillglass('K', solution);
        });
    }


    run(solution, index) {
        if (index >= solution.length) {
            $('#go').show();

            return;
        }

        var vPlace = solution[index].value.servus_loc,
            that = this; //.value.servus_loc;
        if (!vPlace) {
            return false;
        }



        this.fillglass(vPlace, solution[index]);


        if (solution[index].key.indexOf('move') > -1) {
            this.goto(vPlace);
        } else {

        }


        //if(index>=solution.length) {   $('#console').val('overload'); return;}
        setTimeout(function () {
            that.run(solution, (index + 1));
        }, 2000);
    }

    goto(place) {
        var vTop = this.states[place].top + 'px',
            vLeft = this.states[place].left + 'px';
        $('#console').text('Go To ' + place);
        $('#servus').animate({
            "top": vTop,
            "left": vLeft
        });
    }

    fillglass(place, solution) {
        $('#console').html('<strong>Current State: </strong> ' + place + ' ');

        var vPlaces = [{
            'name': 'K',
            'full': solution.value.servus_full,
            'empty': solution.value.servus_empty
        },
        {
            'name': 'T1',
            'full': solution.value.t1_full,
            'empty': solution.value.t1_empty
        },
        {
            'name': 'T2',
            'full': solution.value.t2_full,
            'empty': solution.value.t2_empty
        }
        ];

        $.each(vPlaces, function (i, place) {
            $('#' + place.name).empty()
            for (var i = 0; i < place.full; i++) {
                var vGlass = $('<img />')
                $(vGlass).attr('src', 'https://i.ibb.co/4VT0fK8/empty-glass-w.png');
                $('#' + place.name).append(vGlass);
            }
            for (var i = 0; i < place.empty; i++) {
                var vGlass = $('<img />')
                $(vGlass).attr('src', 'https://i.ibb.co/2y6b6Vj/empty-glass-outline.png');
                $('#' + place.name).append(vGlass);
            }
        });
    }
}