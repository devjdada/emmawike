import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';

interface ImportPropertiesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ImportPropertiesModal({ isOpen, onClose }: ImportPropertiesModalProps) {
    const { toast } = useToast();
    const { data, setData, post, processing, errors } = useForm<{ file: File | null }>({ file: null });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.file) {
            toast({ title: 'No file selected', description: 'Please select a JSON or CSV file to import.', variant: 'destructive' });
            return;
        }

        post(route('admin.properties.import'), {
            onSuccess: () => {
                toast({ title: 'Import Successful', description: 'Properties have been imported.' });
                onClose();
            },
            onError: (e) => {
                console.error(e);
                toast({ title: 'Import Failed', description: 'Please check the file format and try again.', variant: 'destructive' });
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import Properties</DialogTitle>
                    <DialogDescription>Select a JSON or CSV file to upload. The file should match the required property structure.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="import-file" className="text-right">
                                File
                            </Label>
                            <Input
                                id="import-file"
                                type="file"
                                className="col-span-3"
                                accept=".json,.csv"
                                onChange={(e) => setData('file', e.target.files ? e.target.files[0] : null)}
                            />
                            {errors.file && <p className="col-span-4 mt-1 text-center text-xs text-red-600">{errors.file}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing || !data.file}>
                            {processing ? 'Importing...' : 'Start Import'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
