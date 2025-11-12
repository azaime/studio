import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src="https://picsum.photos/seed/user/200/200" alt="@admin" />
                <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="text-3xl">Admin User</CardTitle>
                <CardDescription>admin@mongo.health</CardDescription>
            </div>
            <Button variant="outline" className="ml-auto">Modifier le profil</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold">Rôle</h3>
                <p className="text-muted-foreground">Admin</p>
            </div>
             <div>
                <h3 className="font-semibold">Département</h3>
                <p className="text-muted-foreground">Administration</p>
            </div>
            <div>
                <h3 className="font-semibold">Dernière connexion</h3>
                <p className="text-muted-foreground">Il y a 2 heures</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
