import CreateUserDialog from '@/components/CreateUserDialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface UsersIndexProps extends PageProps {
    users: {
        data: User[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        search: string;
        role: string;
    };
}

export default function UsersIndex({ auth, users, filters }: UsersIndexProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || 'all');
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const params = {
            search: debouncedSearch,
            role: role === 'all' ? '' : role,
        };
        router.get(route('admin.users.index'), params, {
            preserveState: true,
            replace: true,
        });
    }, [debouncedSearch, role]);

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedUser) {
            // Implement actual delete logic here
            console.log('Deleting user:', selectedUser.id);
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <AppLayout user={auth.user}>
            <Head title="Users" />

            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Users</h1>
                <Button onClick={() => setIsAddUserDialogOpen(true)}>Add New User</Button>
            </div>

            <div className="mb-4 flex items-center space-x-4">
                <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
                <Select onValueChange={(value) => setRole(value)} value={role}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="tenant">Tenant</SelectItem>
                        <SelectItem value="owner">Owner</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.data.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2" asChild>
                                    <Link href={route('admin.users.edit', user.id)}>Edit</Link>
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(user)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-4 flex justify-center">
                <div className="flex space-x-2">
                    {users.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || ''}
                            className={`rounded border px-4 py-2 ${link.active ? 'bg-blue-500 text-white' : ''} ${!link.url ? 'cursor-not-allowed text-gray-400' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            as="button"
                            disabled={!link.url}
                        />
                    ))}
                </div>
            </div>

            <CreateUserDialog isOpen={isAddUserDialogOpen} onClose={() => setIsAddUserDialogOpen(false)} />

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the user "{selectedUser?.name}".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
