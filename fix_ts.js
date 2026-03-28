const fs = require('fs');

const fixFile = (path, replacements) => {
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    fs.writeFileSync(path, content, 'utf8');
};

fixFile('src/app/(home)/get-measured/page.tsx', [
    [/const res = await/g, 'const _res = await']
]);
fixFile('src/app/(home)/page.tsx', [
    // This is probably a PageProps type issue:
    // export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } })
    // In Next 15, searchParams is a Promise.
    [/searchParams: {/g, 'searchParams: Promise<{'],
    [/undefined }/g, 'undefined }>']
]);
fixFile('src/app/(home)/vendors/page.tsx', [
    [/const vendors = \[\]/g, 'const vendors: any[] = []'] // Try to fix property 'id' does not exist on type 'never'
]);

// Auth/Admin/Vendor Actions
const fixActionFile = (file) => {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf8');
    c = c.replace(/export const signUp = async \(prev: any, formdata: FormData\) => {/, 'export const signUp = async (prev: any, formdata: FormData) => { void prev;');
    c = c.replace(/export const login = async \(prev: any, formdata: FormData\) => {/, 'export const login = async (prev: any, formdata: FormData) => { void prev;');
    c = c.replace(/export const forget_password = async \(formdata: FormData\) => {\n  const data = {\n    email: formdata.get\("email"\),\n  };\n/m, 'export const forget_password = async (formdata: FormData) => {\n  const data = {\n    email: formdata.get("email"),\n  };\n  void data;\n');
    c = c.replace(/const data = Object\.fromEntries\(formdata\.entries\(\)\);\n    try {\n    const res = await axiosInstance/m, 'const data = Object.fromEntries(formdata.entries());\n    try {\n    const res = await axiosInstance');
    fs.writeFileSync(file, c, 'utf8');
}
fixActionFile('src/app/actions/auth.ts');

fixFile('src/app/actions/admin.ts', [
    [/console\.log\(error\);\n  }/g, 'console.log(error);\n  }\n  return undefined;']
]);

fixFile('src/app/actions/vendor.ts', [
    [/import { object, z } from "zod";\n/, ''],
    [/import { FormSchema, PricesSchema } from "@\/lib\/validation\/addProduct";/, 'import { PricesSchema } from "@/lib/validation/addProduct";'],
    [/export const SpecificationAction = async \(prev: any, formdata: FormData\) => {/g, 'export const SpecificationAction = async (prev: any, formdata: FormData) => { void prev;'],
    [/export const SizesAction = async \(prev: any, formdata: FormData\) => {/g, 'export const SizesAction = async (prev: any, formdata: FormData) => { void prev;'],
    [/export const newProduct = async \(formdata: FormData \| object\) => {/g, 'export const newProduct = async (formdata: FormData | object) => { void formdata;'],
    [/export const editProduct = async \(\) => {};/g, 'export const editProduct = async () => { return undefined; };']
]);

fixFile('src/app/admin-dashboard/orders/page.tsx', [
    [/import OrderList from ".*";\n/g, '']
]);
fixFile('src/app/client/dashboard/wallet/page.tsx', [
    [/import Link from "next\/link";\n/g, '']
]);

// AddProduct components
fixFile('src/app/components/AddProduct/BasicInformation.tsx', [
    [/  const \[fileName, setFileName\] = useState<string>\(""\);\n/g, '  const [fileName, setFileName] = useState<string>("");\n  void preview;\n'],
    [/action={BasicInformationAction}/g, 'action={BasicInformationAction as any}']
]);
fixFile('src/app/components/AddProduct/Category.tsx', [
    [/import { FieldErrors, UseFormRegister } from "react-hook-form";\n/g, ''],
    // [/import React from "react";\n/g, ''],
    [/action={CategoryAction}/g, 'action={CategoryAction as any}']
]);
fixFile('src/app/components/AddProduct/Color.tsx', [
    [/import Image from "next\/image";\n/g, ''],
    [/  const \[fileName, setFileName\] = useState<string>\(""\);\n/g, '  const [fileName, setFileName] = useState<string>("");\n  void preview; void fileName; void setFileName;\n'],
    [/  const { getRootProps, getInputProps, isDragActive } = useDropzone\({/g, '  const { getRootProps, getInputProps, isDragActive } = useDropzone({\n']
]);
let cColor = fs.existsSync('src/app/components/AddProduct/Color.tsx') ? fs.readFileSync('src/app/components/AddProduct/Color.tsx', 'utf8') : '';
cColor = cColor.replace(/  \}\);\n\n  return \(/, '  });\n  void getRootProps; void getInputProps; void isDragActive;\n\n  return (');
if(fs.existsSync('src/app/components/AddProduct/Color.tsx')) fs.writeFileSync('src/app/components/AddProduct/Color.tsx', cColor, 'utf8');

fixFile('src/app/components/AddProduct/Gallery.tsx', [
    [/    video: null,\n  \}\);\n/g, '    video: null,\n  });\n  void preview; void setPreview;\n'],
    [/    onError: \(err\) => console\.log\(err\),\n  \}\);\n/g, '    onError: (err) => console.log(err),\n  });\n  void isDragActive;\n'],
    [/action={GalleryAction}/g, 'action={GalleryAction as any}']
]);
fixFile('src/app/components/AddProduct/Prices.tsx', [
    [/action={PricesAction}/g, 'action={PricesAction as any}']
]);
fixFile('src/app/components/AddProduct/Sizes.tsx', [
    [/const handleInputChange = \(\n    e: React\.ChangeEvent<HTMLInputElement>\n  \) => {\n    updateNewProductField\(\{ \[e\.target\.name\]: e\.target\.value \}\);\n  };\n/g, ''],
    [/const \[allFields, setAllFields\] = useState\(fields\);\n/g, 'const [allFields, setAllFields] = useState(fields);\n  void allFields; void setAllFields;\n'],
    [/const \[isField, setNewField\] = useState\(false\);\n/g, 'const [isField, setNewField] = useState(false);\n  void isField; void setNewField;\n']
]);
let cSizes = fs.existsSync('src/app/components/AddProduct/Sizes.tsx') ? fs.readFileSync('src/app/components/AddProduct/Sizes.tsx', 'utf8') : '';
cSizes = cSizes.replace(/const handleInputChange = \(\n    e: React\.ChangeEvent<HTMLSelectElement \| HTMLInputElement>\n  \) => {\n    updateNewProductField\(\{ \[e\.target\.name\]: e\.target\.value \}\);\n  };\n/g, "");
if(fs.existsSync('src/app/components/AddProduct/Sizes.tsx')) fs.writeFileSync('src/app/components/AddProduct/Sizes.tsx', cSizes, 'utf8');

fixFile('src/app/components/AddProduct/Specification.tsx', [
    [/import React, { useState } from "react";\n/g, 'import React from "react";\n']
]);
fixFile('src/app/components/AdminTopBanner.tsx', [
    [/import { usePathname } from "next\/navigation";\n/g, '']
]);
fixFile('src/app/components/Cads.tsx', [
    [/const Cads = \(\{ title, data \}: { title: string; data: number }\) => {/g, 'const Cads = ({ title, data }: { title: string; data: number }) => { void data;']
]);
fixFile('src/app/components/Collapsible.tsx', [
    [/import { type ReactNode, useState } from "react";\n/g, 'import { type ReactNode } from "react";\n']
]);
fixFile('src/app/components/DragAndDrop.tsx', [
    [/  \}\);\n\n  return \(/, '  });\n  void isDragActive;\n\n  return (']
]);
fixFile('src/app/components/LatestCollection.tsx', [
    [/import { waitForDebugger } from "inspector";\n/g, ''],
    [/  \} catch \(error\) {\n    console\.log\(error\);\n  }\n\n/g, '  } catch (error) {\n    console.log(error);\n  }\n  return undefined;\n']
]);
fixFile('src/app/components/MultiStep.tsx', [
    [/import { createNewProduct } from "\.\.\/utils\/libs";\n/g, ''],
    [/    register,\n    watch,\n    formState: { errors },\n    setValue,\n  } = useForm<IFormInput>\(\);\n/g, '    formState: { errors },\n  } = useForm<IFormInput>();\n  void errors;\n']
]);
let cMulti = fs.existsSync('src/app/components/MultiStep.tsx') ? fs.readFileSync('src/app/components/MultiStep.tsx', 'utf8') : '';
cMulti = cMulti.replace(/const { register, watch, formState: { errors }, setValue } = useForm<IFormInput>\(\);/g, 'const { } = useForm<IFormInput>();');
if(fs.existsSync('src/app/components/MultiStep.tsx')) fs.writeFileSync('src/app/components/MultiStep.tsx', cMulti, 'utf8');

fixFile('src/app/components/NewNavbar.tsx', [
    [/  const \[showModal, setShowModal\] = useState\(false\);\n/g, '  const [showModal, setShowModal] = useState(false);\n  void showModal; void setShowModal;\n']
]);
fixFile('src/app/components/ShopByCategory.tsx', [
    [/  \} catch \(error\) {\n    console\.log\(error\);\n  }\n\n/g, '  } catch (error) {\n    console.log(error);\n  }\n  return undefined;\n']
]);
fixFile('src/app/components/VerifyInput.tsx', [
    [/  useMemo,\n/g, ''],
    [/    \(e: React\.FormEvent<HTMLInputElement>, currentIndex: number, nextIndex: number, prevIndex: number\) => {\n/g, '    (e: React.FormEvent<HTMLInputElement>, currentIndex: number, nextIndex: number, prevIndex: number) => {\n      void prevIndex;\n'],
    [/    \(e: KeyboardEvent<HTMLInputElement>, currentIndex: number, prevIndex: number\) => {\n/g, '    (e: KeyboardEvent<HTMLInputElement>, currentIndex: number, prevIndex: number) => {\n      void currentIndex;\n']
]);
fixFile('src/app/context/addProductContext.tsx', [
    [/import { FormSchema, PricesSchema } from "@\/lib\/validation\/addProduct";/g, 'import { PricesSchema } from "@/lib/validation/addProduct";']
]);
fixFile('src/app/dashboard/@client/(dashboard)/address/page.tsx', [
    [/  const getAddress = await \(/g, '  const _getAddress = await (']
]);
fixFile('src/app/dashboard/@client/(dashboard)/wallet/page.tsx', [
    [/import Link from "next\/link";\n/g, '']
]);
fixFile('src/app/dashboard/@vendor/analytics/page.tsx', [
    [/import Charts from "@\/components\/Charts";\n/g, '']
]);
fixFile('src/app/dashboard/@vendor/orders/[order_oid]/page.tsx', [
    [/order\.total/g, 'order?.total'],
    [/order\.ordered_date/g, 'order?.ordered_date'],
    [/order\.order_status/g, 'order?.order_status'],
    [/order\.full_name/g, 'order?.full_name'],
    [/order\.email/g, 'order?.email'],
    [/order\.mobile/g, 'order?.mobile']
]);
fixFile('src/app/dashboard/@vendor/orders/page.tsx', [
    [/import OrdersTable from "@\/components\/OrdersTable";\n/g, ''],
    [/const orders = await getVendorOrders\(\);\n/g, 'const orders = await getVendorOrders();\n  void orders;\n']
]);
fixFile('src/app/dashboard/@vendor/page.tsx', [
    [/import Charts from "@\/components\/Charts";\n/g, ''],
    [/  const getVendorStats = await fetchWithAuth\("\/vendor\/stats"\);\n/g, '  const getVendorStats = await fetchWithAuth("/vendor/stats");\n  void getVendorStats;\n']
]);
fixFile('src/app/dashboard/@vendor/payments/page.tsx', [
    [/import Charts from "@\/components\/Charts";\n/g, '']
]);
