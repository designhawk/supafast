// Local-only mode - no account management needed
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";

export function AccountInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Running in local-only mode. No account required.
        </p>
      </CardContent>
    </Card>
  );
}
