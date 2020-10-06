class ServusState {
    servus_loc = 'K'
    servus_empty = 0
    servus_full = 0
    t1_empty = 0
    t2_empty = 0
    t1_full = 0
    t2_full = 0

    constructor(start) {
        if (!start || !this.is_legal(start)) {
            this.servus_loc = 'K';
            this.servus_empty = 0;
            this.servus_full = 0;
            this.t1_empty = 0;
            this.t2_empty = 0;
            this.t1_full = 0;
            this.t2_full = 0;
        } else {
            this.set_state(start);
        }
    }

    get_state() {
        return {
            "loc": this.servus_loc,
            "s_full": this.servus_full,
            "s_empty": this.servus_empty,
            "t1_full": this.t1_full,
            "t1_empty": this.t1_empty,
            "t2_full": this.t2_full,
            "t2_empty": this.t2_empty
        }
    }

    is_legal(start) {
        var servus_cnt = start.s_full + start.s_empty,
            t1_cnt = start.t1_full + start.t1_empty,
            t2_cnt = start.t2_full + start.t2_empty;
        return (servus_cnt <= 2 && servus_cnt >= 0 &&
            t1_cnt <= 3 && t1_cnt >= 0 &&
            t2_cnt <= 3 && t2_cnt >= 0);

    }

    set_state(state) {
        this.servus_loc = state.loc;
        this.servus_empty = state.s_empty;
        this.servus_full = state.s_full;
        this.t1_empty = state.t1_empty;
        this.t2_empty = state.t2_empty;
        this.t1_full = state.t1_full;
        this.t2_full = state.t2_full;
    }

    act_move_k_t1() {
        if (this.servus_loc == 'K' && this.servus_empty == 0) {
            var new_state = clone(this);
            debugger;
            new_state.servus_loc = 'T1';
            return new_state;
        } else {
            return null;
        }
    }

    act_move_k_t2() {
        if (this.servus_loc === 'K' && this.servus_empty == 0) {
            var new_state = clone(this);
            new_state.servus_loc = 'T2';
            return new_state;
        } else {
            return null;
        }
    }

    act_move_t1_k() {
        if (this.servus_loc === 'T1' && this.servus_full == 0) {
            var new_state = clone(this);
            new_state.servus_loc = 'K';
            return new_state;
        } else {
            return null;
        }
    }

    act_move_t2_k() {
        if (this.servus_loc === 'T2' && this.servus_full === 0) {
            var new_state = clone(this);
            new_state.servus_loc = 'K';
            return new_state;
        } else {
            return null;
        }
    }

    act_move_t1_t2() {
        if (this.servus_loc == 'T1') {
            var new_state = clone(this);
            new_state.servus_loc = 'T2';
            return new_state;
        } else {
            return null;
        }
    }

    act_move_t2_t1() {
        if (this.servus_loc == 'T2') {
            var new_state = clone(this);
            new_state.servus_loc = 'T1';
            return new_state;
        } else {
            return null;
        }
    }

    act_pickup_k() {
        if (this.servus_loc == 'K' &&
            this.servus_full < 2 &&
            this.servus_empty == 0) {
            var new_state = clone(this);
            new_state.servus_full = new_state.servus_full + 1;
            return new_state;
        } else {
            return null;
        }
    }

    act_setdown_k() {
        if (this.servus_loc == 'K' && this.servus_empty > 0) {
            var new_state = clone(this);
            new_state.servus_empty = new_state.servus_empty - 1;
            return new_state;
        } else {
            return null;
        }
    }

    act_setdown_t1() {
        if (this.servus_loc == 'T1' &&
            this.servus_full > 0 &&
            this.t1_full + this.t1_empty < 3) {
            var new_state = clone(this);
            new_state.servus_full = new_state.servus_full - 1;
            new_state.t1_full = new_state.t1_full + 1;
            return new_state;
        } else {
            return null;
        }
    }

    act_pickup_t1() {
        if (this.servus_loc == 'T1' && this.servus_full + this.servus_empty < 2 && this.t1_empty > 0) {
            var new_state = clone(this);
            new_state.servus_empty = new_state.servus_empty + 1;
            new_state.t1_empty = new_state.t1_empty - 1;
            return new_state;
        } else {
            return null;
        }
    }

    act_setdown_t2() {
        if (this.servus_loc == 'T2' && this.servus_full > 0 && this.t2_full + this.t2_empty < 3) {
            var new_state = clone(this);
            new_state.servus_full = new_state.servus_full - 1;
            new_state.t2_full = new_state.t2_full + 1;
            return new_state;
        } else {
            return null;
        }
    }

    act_pickup_t2() {
        if (this.servus_loc == 'T2' && this.servus_full + this.servus_empty < 2 && this.t2_empty > 0) {
            var new_state = clone(this);
            new_state.servus_empty = new_state.servus_empty + 1;
            new_state.t2_empty = new_state.t2_empty - 1;
            return new_state;
        } else {
            return null;
        }
    }

    generate_children() {
        var result = [];
        for (var i in dir(this)) {
            var act = dir(this)[i];
            if (act.toString().indexOf('act_') > -1) {

                var new_state = this[act]();
                if (new_state != null) {
                    result.push({
                        key: act,
                        value: new_state
                    });
                }
            }
        }
        return result;
    }

    hash() {
        var result;
        if (this.servus_loc == 'K') {
            result = 0
        } else if (this.servus_loc == 'T1') {
            result = 10;
        } else {
            result = 20;
            result = (result +
                this.servus_empty +
                this.servus_full * 2 +
                this.t1_empty * 3 +
                this.t1_full * 5 +
                this.t2_empty * 7 +
                this.t2_full * 11
            );
            return result;
        }
    }
    eq(other) {
        return (this.servus_loc == other.servus_loc &&
            this.servus_empty == other.servus_empty &&
            this.servus_full == other.servus_full &&
            this.t1_empty == other.t1_empty &&
            this.t1_full == other.t1_full &&
            this.t2_empty == other.t2_empty &&
            this.t2_full == other.t2_full);
    }

    toString() {
        var vresult = 'S(' + this.servus_loc + ',' + this.servus_full + ',' + this.servus_empty + '),T1(' + this.t1_full + ',' + this.t1_empty + '),T2(' + this.t2_full + ',' + this.t2_empty + ')';
        return vresult;
    }

}