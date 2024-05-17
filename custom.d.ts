declare class PaiementPro {
    constructor(merchantId: string);
    amount: number;
    channel: string;
    referenceNumber: string;
    customerEmail: string;
    customerFirstName: string;
    customerLastname: string;
    customerPhoneNumber: string;
    description: string;
    getUrlPayment(): Promise<void>;
    success: boolean;
    url: string;
    error: string;
    notificationURL: string;
    returnURL: string;
    returnContext:any;
}
