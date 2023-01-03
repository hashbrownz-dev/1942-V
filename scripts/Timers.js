// Alarm -> Perform a specified action ONCE after a set amount of time.

class Alarm{
    constructor(duration, action){
        this.duration = duration;
        this.action = action;
    }

    get clear(){
        return this.duration <= 0;
    }

    update(game){
        this.duration--;
        if(this.clear){
            this.action(game);
        }
    }
}

// Interval -> Repeat the specified every interval

class Interval{
    constructor(interval, action, duration = -1){
        this.interval = interval;
        this.timer = 0;
        this.action = action;
        this.duration = duration;
        this.clear = false;
    }

    update(game){
        this.timer--;
        this.duration--;

        if(this.timer <= 0){
            this.action(game);
            this.timer = this.interval;
        }

        if(this.duration === 0){
            this.clear = true;
        }
    }
}

class Timeline{
    constructor(alarms){
        this.alarms = alarms;
        this.current = this.alarms.shift();
    }

    update(game){
        if(!this.clear){
            this.current.update(game);
            if( this.current.clear && this.alarms.length > 0 ) this.current = this.alarms.shift();
        }
    }

    get clear(){
        return (this.alarms.length === 0 && this.current.clear)
    }
}

// HELPER FUNCTIONS

const secondsToFrames = (seconds) => {
    return seconds * 60
}