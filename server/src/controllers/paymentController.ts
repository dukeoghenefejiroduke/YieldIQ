import { Request, Response } from 'express';
import Log from '../models/Log';

// Handle webhook callbacks from OPay (Placeholder for OPay API integration)
export const handlePaymentWebhook = async (req: Request, res: Response) => {
  try {
    // OPay webhook payload structure typically involves verifying a hash/signature
    const { reference, status, order_no } = req.body;
    
    console.log('Processing OPay webhook for reference:', reference);

    // Update the log status based on OPay status
    // OPay status 'SUCCESS' mapped to 'completed'
    const updatedLog = await Log.findOneAndUpdate(
      { transactionReference: reference }, 
      { paymentStatus: status === 'SUCCESS' ? 'completed' : 'failed' },
      { new: true }
    );
    
    if (!updatedLog) {
      console.error('Log not found for OPay reference:', reference);
      return res.status(404).json({ error: 'Log not found' });
    }

    res.status(200).send('OPAY_WEBHOOK_PROCESSED');
  } catch (error) {
    console.error('OPay webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
};
