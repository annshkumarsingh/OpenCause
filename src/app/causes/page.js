import CharityList from "@/components/CharityList";

const page = async () => {
  return (
    <div>
      <CharityList />
    </div>
  )
}

export const metadata = {
  title: "Causes",
  description: "This is the Causes page of OpenCause.",
};

export default page
