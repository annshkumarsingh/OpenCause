import CharityCard from "@/components/CharityCard";
import Link from "next/link";

async function getTopCharities() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/charities?limit=3`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch charities");
  return res.json();
}

export default async function Home() {

  const data = await getTopCharities();
  const charities = data.charities || [];

  return (
    <div className="main min-h-screen w-11/12 md:w-3/4 mx-auto pb-16 pt-[80px] flex flex-col gap-16">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center py-7">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Empower Change with <span className="text-emerald-600">OpenCause</span>
        </h1>
        <p className="text-gray-600 mt-3 text-lg md:w-3/4">
          Discover trusted charities and donation websites from across India. Support causes
          that matter most — directly from our platform or through verified charity links.
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            href="/causes"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Start Giving
          </Link>
          <Link
            href="/impact"
            className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            See your Impact
          </Link>
        </div>
      </section>

      {/* ABOUT / MISSION SECTION */}
      <section className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 md:w-2/3 mx-auto">
          At OpenCause, we aim to simplify giving. We list and verify charities, ensuring your
          donations reach the right hands. Our goal is to make every contribution transparent,
          meaningful, and secure.
        </p>

        <div className="flex flex-wrap justify-center gap-10 mt-10">
          <div className="flex flex-col items-center max-w-[200px]">
            <img src="/globe.svg" alt="Trust" className="w-12 h-12 mb-2" />
            <h3 className="font-semibold text-gray-700">Verified Charities</h3>
            <p className="text-gray-500 text-sm text-center">Each charity is manually verified to ensure authenticity.</p>
          </div>

          <div className="flex flex-col items-center max-w-[200px]">
            <img src="/globe.svg" alt="Security" className="w-12 h-12 mb-2" />
            <h3 className="font-semibold text-gray-700">Secure Payments</h3>
            <p className="text-gray-500 text-sm text-center">Donate safely using trusted payment methods.</p>
          </div>

          <div className="flex flex-col items-center max-w-[200px]">
            <img src="/globe.svg" alt="Impact" className="w-12 h-12 mb-2" />
            <h3 className="font-semibold text-gray-700">Real Impact</h3>
            <p className="text-gray-500 text-sm text-center">Track your contributions and see real-world outcomes.</p>
          </div>
        </div>
      </section>

      {/* FEATURED CHARITIES */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Featured Charities
        </h2>

        <div className="flex flex-col gap-6">
          {charities.map((charity) => (
            <CharityCard
              key={charity._id}
              title={charity.title}
              desc={charity.desc}
              website={charity.website}
              img={charity.img}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/causes"
            className="text-emerald-600 font-semibold hover:underline"
          >
            View all charities →
          </Link>
        </div>
      </section>


      {/* CALL TO ACTION */}
      <section className="text-center bg-emerald-50 p-8 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Ready to Make a Difference?
        </h2>
        <p className="text-gray-600 mb-6">
          Your small act of kindness can create a big impact. Join hands with OpenCause today.
        </p>
        <Link
          href="/causes"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Explore Causes
        </Link>
      </section>

    </div>
  );
}
