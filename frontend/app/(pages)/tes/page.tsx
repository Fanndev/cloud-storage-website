import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default function DashboardPage() {
  // Check if dotenv is working
  console.log("Environment Variable TEST_VAR:", process.env.TEST_VAR);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="font-bold text-2xl text-red-500">hello world</div>
      <div className="text-gray-700 dark:text-gray-300 mt-4">
        You can add your file manager or other components here.
      </div>
    </div>
  );
}
