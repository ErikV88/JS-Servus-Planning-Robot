class ServusSpace {
    visited = []
    best = null
    frontier = null

    constructor() {
        this.visited = [];
        this.best = null;
        this.frontier = new Queue();
    }

    is_goal(path) {
        var state = path[path.length - 1].value; 

        if (path.length == 1) {
            if (state.t1_full == 3 && state.t2_full == 3 &&
                state.t1_empty == 0 && state.t2_empty == 0) {
                return true;
            } else {
                return false;
            }
        }

        if (state.servus_loc != 'K') {
            return false;
        }
        if (state.servus_full != 0) {
            return false;
        }
        if (state.servus_empty != 0) {
            return false;
        }

        return true;
    }

    solve(start) {
        var start_path = [{
            key: 'start',
            value: start
        }];
        this.frontier.enqueue(start_path);
        this.visited.push(start);
        var path = this.frontier.dequeue();
        while (path != null) {
            if (this.is_goal(path) == true) {
                this.check_best(path);
            } else {
                var state = path[path.length - 1].value; //# the last state in the path
                var children = state.generate_children();
                this.visited.push(state);
                for (var i in children) {
                    var c = children[i];
                    if (this.is_visited(c) === false) {
                        var new_path = clone(path);
                        new_path.push(c);
                        this.frontier.enqueue(new_path);
                    }
                }
            }
            if (this.frontier.isEmpty()) {
                path = null;
            } else {
                path = this.frontier.dequeue();
            }
        }
        return this.best;
    }

    is_visited(c) {
        for (var i in this.visited) {
            var v = this.visited[i];
            if (v.eq(c.value)) {
                return true;
            }
        }
        return false;
    }

    check_best(path) {

        if (this.best == null) {
            this.best = path
            return;
        } else {
            var path_end = path[path.length - 1].value;
            var best_end = this.best[this.best.length - 1].value;
            if (path_end.t1_full + path_end.t2_full >
                best_end.t1_full + best_end.t2_full) {
                this.best = path;
                return;
            } else if (path_end.t1_empty + path_end.t2_empty <
                best_end.t1_empty + best_end.t2_empty) {
                this.best = path;
                return;
            } else if (path.length < this.best.length) {
                this.best = path;
                return;
            } else {
                return;
            }
        }
    }
}