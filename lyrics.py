import sys
import collections
check_string = sys.argv[1]
# print('#Hello from python#')
# print(check_string)
# print(sys.argv[1])
# print('Second param:'+sys.argv[2]+'#')

words = check_string.split()
word_counts = collections.Counter(words)
for word, count in sorted(word_counts.items()):
    print('"%s" is repeated %d time%s.' % (word, count, "s" if count > 1 else ""))
