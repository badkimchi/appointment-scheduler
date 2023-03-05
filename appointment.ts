export class Appointment {
    static AppointmentBuilder = class {
        private _startTime: Date = new Date();
        private _endTime: Date = new Date();
        private _maxParticipants: number = 1;
        private _hostId: number = 1;
        private _clientIds: Array<number> = [];

        maxParticipants(value: number) {
            this._maxParticipants = value;
            return this;
        }

        hostId(value: number) {
            this._hostId = value;
            return this;
        }

        clientIds(value: Array<number>) {
            this._clientIds = value;
            return this;
        }

        endTime(value: Date) {
            this._endTime = value;
            return this;
        }

        startTime(time: Date) {
            this._startTime = time;
            return this;
        }

        build() {
            if (this._startTime > this._endTime) {
                throw new Error('end time must be after start time!')
            }
            if (this._maxParticipants < 1) {
                throw new Error('max participants must be at least 1')
            }
            if (!this._startTime || !this._endTime) {
                throw new Error('startTime and endTime must be set!')
            }
            if (!this._maxParticipants) {
                throw new Error('maxParticipants must be set!')
            }
            if (!this._hostId) {
                throw new Error('hostId must be set!')
            }

            return new Appointment(
                this._startTime,
                this._endTime,
                this._maxParticipants,
                this._hostId,
                this._clientIds,
            );
        }
    }

    protected constructor(
        startTime,
        endTime,
        maxParticipants,
        hostId,
        clientIds,
    ) {
        this._startTime = startTime;
        this._endTime = endTime;
        this._maxParticipants = maxParticipants;
        this._hostId = hostId;
        this._clientIds = clientIds;
    }

    private _endTime: Date;

    get endTime(): Date {
        return this._endTime;
    }

    set endTime(value: Date) {
        if (this._startTime > value || !value) {
            throw new Error('end time must be after start time!')
        }
        this._endTime = value;
    }

    private _maxParticipants: number;

    get maxParticipants(): number {
        return this._maxParticipants;
    }

    set maxParticipants(value: number) {
        if (value < 1 || !value) {
            throw new Error('max participants must be at least 1')
        }
        this._maxParticipants = value;
    }

    private _hostId: number;

    get hostId(): number {
        return this._hostId;
    }

    set hostId(value: number) {
        if (value < 0 || !value) {
            throw new Error('host id must be a positive number')
        }
        this._hostId = value;
    }

    private _clientIds: Array<number>;

    get clientIds(): Array<number> {
        return this._clientIds;
    }

    set clientIds(value: Array<number>) {
        if (!value) {
            throw new Error('client Ids must be an array!')
        }
        this._clientIds = value;
    }

    private _startTime: Date;

    get startTime(): Date {
        return this._startTime;
    }

    set startTime(value: Date) {
        if (this._endTime < value || !value) {
            throw new Error('end time must be after start time!')
        }
        this._startTime = value;
    }
}