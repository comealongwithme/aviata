export enum Airlines {
	KC = 'Air Astana',
	HY = 'Uzbekistan Airways',
	EK = 'Emirates',
	HR = 'HR',
	FZ = 'Flydubai',
	S7 = 'S7 Airlines',
	LH = 'Lufthansa',
	BT = 'Air Baltic',
	CZ = 'China Southern Airlines',
	SU = 'Aeroflot',
	B2 = 'Belavia',
	DV = 'SCAT Airlines',
	TK = 'Turkish Airlines'
}

export interface FlightPrice {
	currency: string,
	amount: string,
	price_raw: number
}

export interface FlightBaggageOption {
	unit: string,
	value: number
}

export interface FlightServices {
	full_description: string,
	alt_text: string,
	code: string,
	description: string,
	title: string,
	default: string,
	solution: string,
	value: string,
	icon: string
}

export interface FlightSegment {
	origin: string,
	airport_dest: string,
	arr_time_iso: string,
	dep_terminal: string,
	dep_time_iso: string,
	carrier_name: string,
	stop_locations: Array<unknown>,
	dest_code: string,
	airport_dest_terminal: string,
	equipment: string,
	flight_num: string,
	stops: number,
	airport_origin: string,
	cabin: string,
	dep_time: string,
	dest: string,
	origin_code: string,
	baggage_options: Array<FlightBaggageOption>,
	arr_time: string,
	plane: string,
	services: FlightServices,
	fare_basis_code: string,
	airport_origin_terminal: string,
	arr_terminal: string,
	carrier: string,
	fare_seats: number
}

export interface FlightItinerary {
	dep_date: string,
	hash: string,
	dir_index: number,
	price: FlightPrice,
	layovers: Array<number>,
	arr_date: string,
	allowed_offers: Array<any>,
	carrier_name: string,
	is_meta: boolean,
	segments: Array<FlightSegment>,
	stops: number,
	carrier: string,
	refundable: boolean,
	traveltime: number
}

export interface FlightPriceDetails {
	base_raw: number,
	modifiers: string,
	modifiers_raw: number,
	taxes: string,
	base: string,
	taxes_raw: number
}

export interface FlightRecord {
	itineraries: Array<Array<FlightItinerary>>,
	price_details: FlightPriceDetails,
	price: string,
	currency: string,
	bonus_usage: boolean,
	services: Record<string, any>,
	price_raw: number,
	validating_carrier: string,
	id: string,
	has_meta: boolean,
	has_offers: boolean,
	best_time: number,
	bonus_accrual: boolean,
	bonus_accrual_details: boolean,
	bonus_usage_details: boolean,
	provider: string,
	refundable: boolean,
	provider_class: string
}
