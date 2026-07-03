export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="w-full px-[10pt]">
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}