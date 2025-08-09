import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface UsersIndexProps extends PageProps {
    users: User[];
}

export default function UsersIndex({ auth, users }: UsersIndexProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Users</h1>
                <Button asChild><Link href={route('users.create')}>Add New User</Link></Button>
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
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(user)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the user "{selectedUser?.name}".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
