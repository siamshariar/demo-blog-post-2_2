// 🧪 DOM Element Removal Test
// Run this in browser console at http://localhost:3000

console.log('🎯 DOM Element Removal Test');
console.log('============================');

// Current state
const currentPosts = Array.from(document.querySelectorAll('[data-post-id]')).map(el => el.getAttribute('data-post-id'));
const currentRows = Array.from(document.querySelectorAll('[data-virtual-row]')).map(el => el.getAttribute('data-virtual-row'));

console.log('📊 Current DOM State:');
console.log('Posts in DOM:', currentPosts);
console.log('Rows in DOM:', currentRows);
console.log('Total cards:', currentPosts.length);

console.log('');
console.log('📝 Instructions:');
console.log('1. Scroll down slowly in the browser');
console.log('2. Run this script again');
console.log('3. Compare the results - posts should change!');
console.log('4. Old posts should be gone, new posts should appear');

console.log('');
console.log('🔍 Verification:');
console.log('- If posts change: ✅ Elements are being removed/added');
console.log('- If count stays ~4-6: ✅ DOM size stays small');
console.log('- If old posts disappear: ✅ Virtualization working');

// Monitor changes
let lastPosts = currentPosts;
setInterval(() => {
  const newPosts = Array.from(document.querySelectorAll('[data-post-id]')).map(el => el.getAttribute('data-post-id'));
  if (JSON.stringify(newPosts) !== JSON.stringify(lastPosts)) {
    console.log('🔄 DOM CHANGED!');
    console.log('Old posts:', lastPosts);
    console.log('New posts:', newPosts);
    console.log('Removed:', lastPosts.filter(p => !newPosts.includes(p)));
    console.log('Added:', newPosts.filter(p => !lastPosts.includes(p)));
    lastPosts = newPosts;
  }
}, 1000);

console.log('');
console.log('⏰ Monitoring DOM changes every second...');
console.log('Scroll and watch the console for "🔄 DOM CHANGED!" messages!');