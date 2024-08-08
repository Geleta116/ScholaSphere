import WithAuth from "@/components/WithAuth";

function Page() {
  return (
    <main className="h-screen ">
      <div className="text-white container">
        <div className="w-80 bg-cyan-900 float-left h-20">word</div>
        <p > Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore veniam earum hic similique sequi tempore culpa numquam velit magni enim quidem modi reiciendis, dolorum, debitis accusamus? Ut, expedita. Voluptatum, repellendus.</p>
      </div>
    </main>
  );
}


export default WithAuth(Page, ["admin", "user"])

