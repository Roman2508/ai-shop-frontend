"use client";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/common/Select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/common/Breadcrumb";
import getPhotoUrl from "@/utils/get-photo-url";
import formatDateTime from "@/utils/format-date-time";
import { Button } from "@/components/ui/common/Button";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { Table, TableRow, TableBody, TableCell, TableHead, TableHeader } from "@/components/ui/common/Table";
import { EnumUserRoles, useFindAllUsersQuery, UserModel, useUpdateUserRoleMutation } from "@/graphql/generated/output";

const UserRolesPage = () => {
  const t = useTranslations("admin.users");

  const { data } = useFindAllUsersQuery();

  const [users, setUsers] = React.useState<UserModel[]>([]);
  const [viewType, setViewType] = React.useState<"all" | "admins">("all");

  const [updateUserRole, { loading }] = useUpdateUserRoleMutation();

  const changeUserRole = async (id: string, role: EnumUserRoles) => {
    try {
      const newRole = role === EnumUserRoles.Admin ? "Адміністратор" : "Користувач";
      if (!window.confirm(`Ви дійсно хочете встановити нову роль "${newRole}"?`)) return;
      await updateUserRole({ variables: { input: { id, role } } });
      setUsers((prev) => {
        const users = prev.map((el) => {
          if (el.id === id) return { ...el, role };
          else return el;
        });
        return users;
      });
      toast.success("Роль користувача було змінено");
    } catch (error) {
      toast.error("Помилка");
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (!data) return;
    setUsers(data.findAllUsers as UserModel[]);
  }, [data]);

  React.useEffect(() => {
    if (!data) return;
    // @ts-ignore
    setUsers((prev) => {
      if (viewType === "admins") {
        return prev.filter((el) => el.role === "ADMIN");
      }
      return data.findAllUsers;
    });
  }, [viewType]);

  return (
    <div className="max-w-[1640] mx-auto px-[16]">
      <Breadcrumb className="mb-[45]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">{t("breadcrumbs.home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/admin">{t("breadcrumbs.admin")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("breadcrumbs.users")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-[46]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">{t("title")}</h1>

          <div className="flex gap-[10]">
            <Select onValueChange={(value: "all" | "admins") => setViewType(value)} value={viewType}>
              <SelectTrigger>
                <SelectValue placeholder={t("select.showAll")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">{t("select.showAll")}</SelectItem>
                  <SelectItem value="admins">{t("select.showAdmins")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">{t("table.photo")}</TableHead>
              <TableHead className="text-center">{t("table.publicName")}</TableHead>
              <TableHead className="text-center">{t("table.userName")}</TableHead>
              <TableHead className="text-center">{t("table.email")}</TableHead>
              <TableHead className="text-center">{t("table.createdAt")}</TableHead>
              <TableHead className="text-center">{t("table.role")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length ? (
              users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell className="flex justify-center">
                      <div className="text-center">
                        <img
                          className="h-[50] w-[50] object-cover"
                          src={user.avatar ? getPhotoUrl(user.avatar, "users") : "/images/empty-image.webp"}
                        />
                      </div>
                    </TableCell>

                    <TableCell className="text-center">{user.displayName}</TableCell>
                    <TableCell className="text-center">{user.username}</TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-center">{formatDateTime(user.createdAt)}</TableCell>

                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-[80] h-[42] mr-[10]"
                        disabled={loading || user.role === "ADMIN"}
                        onClick={() => changeUserRole(user.id, EnumUserRoles.Admin)}
                      >
                        ADMIN
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        className="w-[80] h-[42]"
                        disabled={loading || user.role === "USER"}
                        onClick={() => changeUserRole(user.id, EnumUserRoles.User)}
                      >
                        USER
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <>
                {Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20] w-[20px] rounded-[0]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[50] w-[50px] rounded-[0]" />
                      </TableCell>
                      <TableCell className="w-full max-w-[40%]">
                        <Skeleton className="h-[20] w-[100%] rounded-[0]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20] w-[100%] rounded-[0]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20] w-[100px] rounded-[0]" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-[20] w-[100px] rounded-[0]" />
                      </TableCell>
                      <TableCell className="flex justify-center gap-[10]">
                        <Skeleton className="h-[45] w-[45]" />
                        <Skeleton className="h-[45] w-[45]" />
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>

        {/* <ProductsPagination
          total={total}
          filter={filter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchFilteredData={fetchFilteredData}
        /> */}
      </div>
    </div>
  );
};

export default UserRolesPage;
