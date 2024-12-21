"use client";

import Navbar from "@/components/navbar/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userUpdateSchema, passwordUpdateSchema } from "@/lib/validation"
import type { UserUpdateData, PasswordUpdateData } from "@/lib/validation"
import { updateUserProfile, updatePassword } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const User = () => {
    const { user, setUser } = useAuth();
    const { toast } = useToast();

    const profileForm = useForm<UserUpdateData>({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
        },
    });

    const passwordForm = useForm<PasswordUpdateData>({
        resolver: zodResolver(passwordUpdateSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const handlePersonalInfoSubmit = async (data: UserUpdateData) => {
        try {
            if (!user?.id) return;
            const updatedUser = await updateUserProfile(user.id, {
                name: data.name,
                email: user.email
            });
            setUser({ ...user, ...updatedUser });
            toast({
                title: "Success",
                description: "Profile updated successfully",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update profile",
            });
        }
    }

    // Handle form submission for password change
    const handlePasswordSubmit = async (data: PasswordUpdateData) => {
        try {
            if (!user?.id) return;
            await updatePassword(user.id, data);
            passwordForm.reset();
            toast({
                title: "Success",
                description: "Password updated successfully",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update password",
            });
        }
    }

    return (
        <>
            <Navbar />
            <div className="w-full max-w-3xl mx-auto py-12 md:py-16">
                <header className="m-8">
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader className="mb-6">
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your profile details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...profileForm}>
                                <form onSubmit={profileForm.handleSubmit(handlePersonalInfoSubmit)} className="space-y-4">
                                    <div className="space-y-10 mb-9">
                                        <FormField
                                            control={profileForm.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input 
                                                id="email" 
                                                type="email" 
                                                value={user?.email || ""} 
                                                disabled 
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full">Save Changes</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your account password.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                                    <FormField
                                        control={passwordForm.control}
                                        name="currentPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={passwordForm.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={passwordForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">Change Password</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default User;
  