import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Warehouse Configuration</CardTitle>
                        <CardDescription>
                            Manage your warehouse locations
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Warehouses</Label>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 rounded-md border p-3">
                                    <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>Main Warehouse</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-md border p-3">
                                    <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>Warehouse 2</span>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" className="mt-2">
                                Add Warehouse
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Profile</CardTitle>
                        <CardDescription>
                            Manage your account settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your name" defaultValue="Admin User" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your@email.com" defaultValue="admin@stockmaster.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" readOnly defaultValue="Inventory Manager" />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
