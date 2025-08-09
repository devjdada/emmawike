import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface MediaUploadModalProps {
    onUpload: (files: File[], label: string) => void;
}

export default function MediaUploadModal({ onUpload }: MediaUploadModalProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [label, setLabel] = useState('property_image');
    const [isOpen, setIsOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = () => {
        onUpload(files, label);
        setFiles([]);
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
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="media-files">Files</Label>
                        <Input id="media-files" type="file" multiple onChange={handleFileChange} />
                    </div>
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
