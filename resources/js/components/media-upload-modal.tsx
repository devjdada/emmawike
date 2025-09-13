import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface MediaUploadModalProps {
    onUpload: (files: File[], label: string) => void;
}

export default function MediaUploadModal({ onUpload }: MediaUploadModalProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [label, setLabel] = useState('property_image');
    const [isOpen, setIsOpen] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);

            const newPreviews: string[] = [];
            selectedFiles.forEach(file => {
                newPreviews.push(URL.createObjectURL(file));
            });
            setPreviews(newPreviews);
        }
    };

    const handleUpload = () => {
        onUpload(files, label);
        setFiles([]);
        setPreviews([]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Media</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Media</DialogTitle>
                    <DialogDescription>
                        Upload images or videos for the property.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="media-files">Files</Label>
                        <Input id="media-files" type="file" multiple onChange={handleFileChange} />
                    </div>
                    {previews.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                            {previews.map((preview, index) => (
                                <div key={index} className="relative w-full h-24 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                                    {files[index].type.startsWith('image') ? (
                                        <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                                    ) : (
                                        <video src={preview} controls className="object-cover w-full h-full" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <div>
                        <Label htmlFor="media-label">Label</Label>
                        <Select onValueChange={setLabel} defaultValue={label}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a label" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="property_image">Property Image</SelectItem>
                                <SelectItem value="floor_plan">Floor Plan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleUpload} disabled={files.length === 0}>
                        Add to Property
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
