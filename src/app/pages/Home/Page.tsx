import LogoutButton from "@/app/components/Logout";

export default function Home() {
  return (
    <main className=" w-full min-h-[calc(100vh)] bg-gray-200 px-8">
      <h1 className="text-3xl font-bold underline">Test</h1>
      <LogoutButton />
    </main>
  );
}
