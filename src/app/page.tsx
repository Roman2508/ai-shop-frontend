import { Button } from "@/components/ui/common/Button";
import { Card } from "@/components/ui/common/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/common/Dialog";
import { Input } from "@/components/ui/common/Input";
import { Textarea } from "@/components/ui/common/Textarea";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";

const TestWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={{ width: "300px", margin: "20px auto 0" }}>{children}</div>
  );
};

export default function Home() {
  const translations = useTranslations("home");

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h1>{translations("title")}</h1>

      <TestWrapper>
        <Button variant="default">Додати до корзини</Button>
      </TestWrapper>

      <TestWrapper>
        <Button variant="link">Скинути фільтри</Button>
      </TestWrapper>

      <TestWrapper>
        <Button variant="outline" size="full">
          На головну
        </Button>
      </TestWrapper>

      <TestWrapper>
        <Button variant="secondary">Купити в один клік</Button>
      </TestWrapper>

      <TestWrapper>
        <Input placeholder="default" />
      </TestWrapper>

      <TestWrapper>
        <Input placeholder="primary" variant="primary" />
      </TestWrapper>

      <TestWrapper>
        <Input placeholder="secondary" variant="secondary" />
      </TestWrapper>

      <TestWrapper>
        <Input placeholder="secondary" variant="secondary" />
      </TestWrapper>

      <TestWrapper>
        <Textarea />
      </TestWrapper>

      <TestWrapper>
        <Card>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </Card>
      </TestWrapper>

      <Dialog>
        <DialogTrigger asChild>
          <TestWrapper>
            <Button variant="outline">Open Modal</Button>
          </TestWrapper>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
