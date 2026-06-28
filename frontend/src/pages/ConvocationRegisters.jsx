import AdminSidebar from "../components/AdminSidebar";
import { FaFileExcel, FaDownload } from "react-icons/fa";
import { downloadRegister } from "../services/registerService";

function ConvocationRegisters() {

  const registers = [
    {
      id: 1,
      file: "Register_1.xlsx",
      batch: "2019 - 2023",
      description: "UG & PG Students",
    },
    {
      id: 2,
      file: "Register_2.xlsx",
      batch: "2020 - 2024",
      description: "UG & PG Students",
    },
    {
      id: 3,
      file: "Register_3.xlsx",
      batch: "2021 - 2025",
      description: "UG & PG Students",
    },
  ];

  // Move handleDownload inside the component
  const handleDownload = async (id, fileName) => {
    try {
      const response = await downloadRegister(id);

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Unable to download register.");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Convocation Registers
        </h1>

        <div className="space-y-6">

          {registers.map((register) => (

            <div
              key={register.id}
              className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
            >

              <div className="flex items-center gap-5">

                <FaFileExcel
                  size={55}
                  className="text-green-600"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {register.file}
                  </h2>

                  <p className="text-gray-600">
                    Batch : {register.batch}
                  </p>

                  <p className="text-gray-500">
                    {register.description}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  handleDownload(
                    register.id,
                    register.file
                  )
                }
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center gap-3"
              >
                <FaDownload />
                Download
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ConvocationRegisters;