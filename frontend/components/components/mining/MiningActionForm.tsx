'use client';

import { useState } from 'react';
import { MiningService } from '@/services/mining/MiningService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ethers } from 'ethers';
import { Loader2, Upload, CheckCircle, Car, Key } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MiningActionForm() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string>('');
    const [txHash, setTxHash] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        vin: '',
        mileage: '',
        description: '',
        ownerSecret: ''
    });
    const [file, setFile] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('Initializing...');
        setError(null);
        setTxHash(null);

        try {
            if (!file) throw new Error("Please upload a photo of the maintenance work.");
            if (!formData.vin) throw new Error("VIN is required.");
            if (!formData.ownerSecret) throw new Error("Owner Secret is required.");

            // 1. IPFS Upload
            setStatus('Uploading evidence to IPFS (Secured Storage)...');
            const ipfsHash = await MiningService.uploadToIPFS(file);
            console.log('IPFS Hash:', ipfsHash);

            // 2. Connect Wallet
            setStatus('Connecting to Wallet for Blockchain Signature...');
            if (!window.ethereum) throw new Error("MetaMask not found!");

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // 3. Metadata Preparation (Simulated for MVP)
            // Ideally we'd calculate reward here too but contract handles event emission

            // 4. Submit Transaction
            setStatus('Minting Maintenance Record on Polygon...');
            const hash = await MiningService.recordMaintenanceOnChain(
                signer,
                formData.vin,
                Number(formData.mileage),
                formData.description,
                ipfsHash,
                formData.ownerSecret
            );

            setTxHash(hash);
            setStatus('Transaction Confirmed!');

            // 5. Log to Supabase (Success)
            await MiningService.recordMiningActivity(
                "current-tech-id", // TODO: Replace with auth user ID
                formData.vin,
                "MAINTENANCE",
                { total: 10, multiplier: 1 }, // TODO: Fetch from calc
                hash
            );

        } catch (err: unknown) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            setStatus('Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-slate-800 bg-slate-900 text-slate-100">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-emerald-400">
                    <Car className="w-6 h-6" />
                    Record Maintenance Log
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Submit immutable maintenance records to the blockchain to earn OZC rewards.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* VIN Input */}
                    <div className="space-y-2">
                        <Label htmlFor="vin">Vehicle Identification Number (VIN)</Label>
                        <Input
                            id="vin"
                            name="vin"
                            placeholder="Enter VIN..."
                            value={formData.vin}
                            onChange={handleInputChange}
                            className="bg-slate-800 border-slate-700 font-mono tracking-widest uppercase"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Mileage */}
                        <div className="space-y-2">
                            <Label htmlFor="mileage">Current Mileage (km)</Label>
                            <Input
                                id="mileage"
                                name="mileage"
                                type="number"
                                placeholder="e.g. 45000"
                                value={formData.mileage}
                                onChange={handleInputChange}
                                className="bg-slate-800 border-slate-700"
                                required
                            />
                        </div>

                        {/* Owner Secret */}
                        <div className="space-y-2">
                            <Label htmlFor="ownerSecret" className="flex items-center gap-2 text-amber-400">
                                <Key className="w-4 h-4" /> Owner Approval Code
                            </Label>
                            <Input
                                id="ownerSecret"
                                name="ownerSecret"
                                type="password"
                                placeholder="Customer's Secret Key"
                                value={formData.ownerSecret}
                                onChange={handleInputChange}
                                className="bg-slate-800 border-slate-700 border-amber-500/30 focus:border-amber-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Service Details</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe the maintenance work..."
                            value={formData.description}
                            onChange={handleInputChange}
                            className="bg-slate-800 border-slate-700 min-h-[100px]"
                            required
                        />
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="file">Evidence (Photo/Video)</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                                className="bg-slate-800 border-slate-700 cursor-pointer file:bg-emerald-600 file:border-0 file:text-white file:mr-4 file:px-4 file:py-2 file:rounded-md hover:file:bg-emerald-700"
                                accept="image/*,video/*"
                            />
                        </div>
                    </div>

                    {/* Status & Errors */}
                    {error && (
                        <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-red-200">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {txHash && (
                        <Alert className="bg-emerald-900/30 border-emerald-800 text-emerald-200">
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                                Record minted on blockchain!
                                <a
                                    href={`https://amoy.polygonscan.com/tx/${txHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 underline text-emerald-400 hover:text-emerald-300"
                                >
                                    View Transaction
                                </a>
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 text-lg shadow-lg shadow-emerald-900/50 transition-all active:scale-[0.98]"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                {status}
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-5 w-5" />
                                Submit Maintenance Record & Mine OZC
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
