export type SensorDataValues = {
    value: string;
    value_type: string;
};

export type LuftdatenData = {
    location: {
        latitude: string;
        longitude: string;
    };
    sensordatavalues: SensorDataValues[];
    timestamp: Date;
};
