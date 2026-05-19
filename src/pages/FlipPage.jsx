import HTMLFlipBook from "react-pageflip";

function FlipPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">

      <HTMLFlipBook
        width={400}
        height={550}
        showCover={true}
        maxShadowOpacity={0.5}
        mobileScrollSupport={true}
      >

        {/* Page 1 */}
        <div className="page">
          <img src="/PDF/cover.jpg" alt="cover" className="w-full h-full object-cover" />
        </div>

        {/* Page 2 */}
        <div className="page">
          <img src="/PDF/content.jpg" alt="page2" className="w-full h-full object-cover" />
        </div>

        {/* Page 3 */}
        <div className="page">
          <img src="/PDF/mcontent.jpg" alt="page3" className="w-full h-full object-cover" />
        </div>
        {/* Page 4 */}
        <div className="page">
          <img src="/PDF/m2content.jpg" alt="page4" className="w-full h-full object-cover" />
        </div>

        <div className="page">
          <img src="/PDF/m3content.jpg" alt="page4" className="w-full h-full object-cover" />
        </div>
          <div className="page">
          <img src="/PDF/m3content.jpg" alt="page4" className="w-full h-full object-cover" />
        </div>
           <div className="page">
          <img src="/PDF/m3content.jpg" alt="page4" className="w-full h-full object-cover" />
        </div>
          <div className="page">
          <img src="/PDF/m3content.jpg" alt="page4" className="w-full h-full object-cover" />
        </div>

      </HTMLFlipBook>

    </div>
  );
}

export default FlipPage;