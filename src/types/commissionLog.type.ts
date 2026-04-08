
export interface CommissionLog {
    _id: string;
    receiver_id: string;
    commission_rate: number;
    commission_amount: number;
    createdAt: string;
}

export interface GetCommissionsPerMonthResponse {
    commissionsPerMonth: { month: string, totalCommission: number }[];
    year: number;
}