
export default function Home() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <section className="body-font">
        <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img className="object-cover object-center rounded" alt="hero" src="/village1.jpg" />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="sm:text-4xl md:text-5xl font-bold mb-4 text-[#590DE1]">
              Abhiyaan
            </h1>
            <div className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, magnam, debitis maiores repellendus eveniet, vel delectus ipsum officiis blanditiis ut officia ipsam harum sint? Odit voluptatum voluptas eius necessitatibus. Perspiciatis.        
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}