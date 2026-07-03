export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="w-full px-[10pt]">
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} resume.dhnaath.com.</p>
          <p className="mt-[1.5pt]">All rights reserved. Made with love.</p>
        </div>
      </div>
    </footer>
  );
}