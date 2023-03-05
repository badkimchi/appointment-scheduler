import {Appointment} from "./appointment";

describe('basic test', () => {
    it('builds normally', () => {
        //given
        const startTime = new Date();
        const endTime = new Date();
        const hostId = 5;
        const maxParticipants = 2;
        const clientIds = [1, 2];


        //when
        const sut = new Appointment.AppointmentBuilder()
            .startTime(startTime)
            .endTime(endTime)
            .hostId(hostId)
            .maxParticipants(maxParticipants)
            .clientIds(clientIds)
            .build();

        //then
        expect(sut.startTime).toBe(startTime);
        expect(sut.endTime).toBe(endTime);
        expect(sut.hostId).toBe(hostId);
        expect(sut.maxParticipants).toBe(maxParticipants);
        expect(sut.clientIds).toBe(clientIds);
    })

    it('throws an error when building with end time earlier than start time', () => {
        //given
        const startTime = new Date();
        const endTime = new Date();
        endTime.setTime(endTime.getTime() - 10);

        //when
        const createWithBogusTime = () => {
            new Appointment.AppointmentBuilder()
                .startTime(startTime)
                .endTime(endTime)
                .build();
        }

        //then
        expect(createWithBogusTime).toThrowError();
    })

    it('throws an error when building with max participants less than 1', () => {
        //given
        const maxParticipants = 0;

        //when
        const createWithBogusTime = () => {
            new Appointment.AppointmentBuilder()
                .maxParticipants(maxParticipants)
                .build();
        }

        //then
        expect(createWithBogusTime).toThrowError();
    })

    it('throws an error when end time is set before start time', () => {
        //given
        const startTime = new Date();
        const endTime = new Date();
        const sut = new Appointment.AppointmentBuilder()
            .startTime(startTime)
            .endTime(endTime)
            .build();

        //when
        const setWithBogusTime = () => {
            endTime.setTime(endTime.getTime() - 10);
            sut.endTime = endTime;
        }

        //then
        expect(setWithBogusTime).toThrowError();
    })

    it('throws an error when building with empty date fields', () => {
        //given

        //when
        const buildWithBogusTime = () => {
            new Appointment.AppointmentBuilder()
                .startTime(undefined)
                .endTime(undefined)
                .build();
        }

        //then
        expect(buildWithBogusTime).toThrowError();
    })

    it('throws an error when max participants is set to less than 1', () => {
        //given
        const sut = new Appointment.AppointmentBuilder()
            .build();

        //when
        const setWithBogusParticipants = () => {
            sut.maxParticipants = -1;
        }

        //then
        expect(setWithBogusParticipants).toThrowError();
    })

    it('throws an error when max participants is set to undefined', () => {
        //given
        const sut = new Appointment.AppointmentBuilder()
            .build();

        //when
        const setWithBogusParticipants = () => {
            sut.maxParticipants = undefined;
        }

        //then
        expect(setWithBogusParticipants).toThrowError();
    })

    it('throws an error when hostId is set to less than 0', () => {
        //given
        const sut = new Appointment.AppointmentBuilder()
            .build();

        //when
        const setWithBogusHostId = () => {
            sut.hostId = -1;
        }

        //then
        expect(setWithBogusHostId).toThrowError();
    })

    it('throws an error when hostId is set to undefined', () => {
        //given
        const sut = new Appointment.AppointmentBuilder()
            .build();

        //when
        const setWithBogusHostId = () => {
            sut.hostId = undefined;
        }

        //then
        expect(setWithBogusHostId).toThrowError();
    })

    it('throws an error when clientIds is set to undefined or null', () => {
        //given
        const sut = new Appointment.AppointmentBuilder()
            .build();

        //when
        const setWithEmptyClientIds = () => {
            sut.clientIds = undefined;
        }

        //then
        expect(setWithEmptyClientIds).toThrowError();
    })

    it('throws an error when startTime is set to greater than end time', () => {
        //given
        const sut = new Appointment.AppointmentBuilder()
            .build();

        //when
        const setWithLateStartTime = () => {
            let newTime = new Date(sut.endTime);
            newTime.setTime(newTime.getTime() + 10)
            sut.startTime = newTime;
        }

        //then
        expect(setWithLateStartTime).toThrowError();
    })

    it('throws an error when startTime is set to undefined', () => {
        //given
        const sut = new Appointment.AppointmentBuilder()
            .build();

        //when
        const setWithBogusStartTime = () => {
            sut.startTime = undefined;
        }

        //then
        expect(setWithBogusStartTime).toThrowError();
    })
})