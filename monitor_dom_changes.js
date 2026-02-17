// 🎯 Real-Time DOM Element Removal Monitor
// Run this in browser console at http://localhost:3000

console.log('🎯 DOM Element Removal Monitor');
console.log('===============================');

// Initial state
let initialPosts = Array.from(document.querySelectorAll('[data-post-id]')).map(el => el.getAttribute('data-post-id'));
console.log('📊 Initial DOM State:');
console.log('Posts in DOM:', initialPosts);
console.log('Count:', initialPosts.length);
console.log('Expected: ["1", "2"] (posts 1-2)');

console.log('');
console.log('📝 Instructions:');
console.log('1. Scroll down slowly in the browser');
console.log('2. Watch this console for real-time updates');
console.log('3. See posts 1-2 get removed, posts 3-100+ get added');

console.log('');
console.log('🔄 Monitoring DOM changes...');

// Monitor DOM changes
let lastPosts = initialPosts;
let changeCount = 0;

const monitor = setInterval(() => {
  const currentPosts = Array.from(document.querySelectorAll('[data-post-id]')).map(el => el.getAttribute('data-post-id'));
  const currentCount = currentPosts.length;

  if (JSON.stringify(currentPosts) !== JSON.stringify(lastPosts)) {
    changeCount++;
    console.log(`🔄 DOM CHANGE #${changeCount}:`);
    console.log('Previous posts:', lastPosts);
    console.log('Current posts: ', currentPosts);
    console.log('Count:', currentCount);

    const removed = lastPosts.filter(p => !currentPosts.includes(p));
    const added = currentPosts.filter(p => !lastPosts.includes(p));

    if (removed.length > 0) {
      console.log('❌ REMOVED from DOM:', removed);
    }
    if (added.length > 0) {
      console.log('✅ ADDED to DOM:', added);
    }

    console.log('---');

    lastPosts = currentPosts;
  }
}, 500); // Check every 500ms

console.log('');
console.log('⏰ Monitoring active... Scroll and watch the changes!');
console.log('Type "clearInterval(monitor)" to stop monitoring.');

// Also log virtualization stats
setInterval(() => {
  const virtualRows = document.querySelectorAll('[data-virtual-row]').length;
  const articleCards = document.querySelectorAll('article').length;
  const fetched = document.querySelector('.bg-blue-50 .text-2xl')?.textContent || 'N/A';

  console.log(`📊 Live Stats: ${virtualRows} rows | ${articleCards} cards in DOM | ${fetched} posts loaded`);
}, 2000);

console.log('');
console.log('🎯 Expected behavior:');
console.log('- Posts 1-2 will disappear from DOM');
console.log('- Posts 3,4,5,6... will appear in DOM');
console.log('- DOM count stays ~2-6 (only visible posts)');
console.log('- Smooth scrolling with no lag');