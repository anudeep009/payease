
export default function Footer() {
  return (
    <footer className="bg-white font-mono  text-gray-700 flex items-center justify-center h-16 px-4 lg:px-6 relative text-center">
      <div className="text-xs md:text-base lg:text-sm">
        &copy; {new Date().getFullYear()} PayEase. Made with ❤️ by Anudeep. All rights reserved.
      </div>
    </footer>
  );
}