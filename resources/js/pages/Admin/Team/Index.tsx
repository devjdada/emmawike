import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, TeamMember } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

interface TeamIndexProps extends PageProps {
    teamMembers: TeamMember[];
}

export default function TeamIndex({ auth, teamMembers }: TeamIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<{
        id: number;
        name: string;
        title: string;
        photo_file: File | null;
        bio: string;
    }>({
        id: 0,
        name: '',
        title: '',
        photo_file: null,
        bio: '',
    });

    const filteredTeamMembers = teamMembers.filter((member) => {
        return member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('photo_file', file);
            setImagePreviewUrl(URL.createObjectURL(file));
        } else {
            setData('photo_file', null);
            setImagePreviewUrl(null);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingTeamMember) {
            post(route('admin.teams.update', editingTeamMember.id), {
                data: { ...data, _method: 'PUT' },
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    setEditingTeamMember(null);
                    setImagePreviewUrl(null);
                },
            });
        } else {
            post(route('admin.teams.store'), {
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    setEditingTeamMember(null);
                    setImagePreviewUrl(null);
                },
            });
        }
    };

    const handleEdit = (member: TeamMember) => {
        setEditingTeamMember(member);
        setData({
            id: member.id,
            name: member.name,
            title: member.title,
            bio: member.bio,
            photo_file: null, // We don't have the file, so we can't pre-fill it
        });
        setImagePreviewUrl(member.photo_url ? `/storage/${member.photo_url}` : null);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            post(route('admin.teams.destroy', id), { data: { _method: 'DELETE' } });
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Team Members" />

            <div className="pt-24 pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Team Member Management</h1>
                            <p className="text-muted-foreground">Manage your team members</p>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={() => {
                                        setEditingTeamMember(null);
                                        reset();
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Team Member
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editingTeamMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
                                    <DialogDescription>
                                        {editingTeamMember ? 'Update the team member details below' : 'Fill in the details to add a new team member'}
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="John Doe" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="CEO & Founder"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="photo_file">Photo</Label>
                                        <Input id="photo_file" type="file" onChange={handleFileChange} />
                                        {errors.photo_file && <p className="mt-1 text-xs text-red-500">{errors.photo_file}</p>}
                                        {imagePreviewUrl && (
                                            <div className="mt-4">
                                                <img src={imagePreviewUrl} alt="Photo Preview" className="h-auto max-h-32 max-w-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            placeholder="A short biography..."
                                            value={data.bio}
                                            onChange={(e) => setData('bio', e.target.value)}
                                        />
                                        {errors.bio && <p className="mt-1 text-xs text-red-500">{errors.bio}</p>}
                                    </div>

                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={processing}>
                                            {editingTeamMember ? 'Update Team Member' : 'Add Team Member'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="mb-6">
                        <CardContent className="p-4">
                            <div className="relative flex-1">
                                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search team members..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Team Members ({filteredTeamMembers.length})</CardTitle>
                            <CardDescription>Manage your team members</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Photo</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Bio</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTeamMembers.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell>
                                                {member.photo_url && (
                                                    <img
                                                        src={`/storage/${member.photo_url}`}
                                                        alt={member.name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{member.name}</TableCell>
                                            <TableCell>{member.title}</TableCell>
                                            <TableCell>{member.bio.length > 100 ? member.bio.slice(0, 100) + '...' : member.bio}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
