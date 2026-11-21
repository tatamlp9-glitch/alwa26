علوة سه فين (26) - النسخة الأونلاين (مجانية 100% ومقفولة بحسابات)
=====================================================================

شنو يصير:
- الموقع على رابط خاص، بس الحسابات اللي تسويها انت تدخل (ماكو تسجيل جديد).
- البيانات تتزامن بين الجوال واللابتوب وأي جهاز تضيفه.
- يثبّت على شاشة الجوال مثل تطبيق، ويفتح حتى لو النت قاطع (والبيانات تتحفظ وترجع تتزامن).
- كل شي على الخطة المجانية: ما تحتاج بطاقة بنكية.

الملفات:
  index.html           النظام نفسه
  firebase-config.js   مفاتيح مشروعك + اسم المدير (تعدله انت)
  firestore.rules      قواعد الأمان (تلصقها بـ Firebase بعد ما تحط الأسماء)
  manifest.webmanifest, sw.js, icon-*.png   للتثبيت كتطبيق وللعمل بدون نت (لا تعدلهم)
  _headers, robots.txt, firebase.json       يمنعون ظهور الموقع بجوجل (لا تعدلهم)

======================= الجزء 1: Firebase (قاعدة البيانات والحسابات) =======================
1) افتح console.firebase.google.com بحساب جوجل ← Create a project ← اسم (مثلاً alwa26)
   ← عطّل Google Analytics ← Create. لا تفعّل أي خطة مدفوعة: خلّيه على Spark (المجانية).

2) من القائمة اليسار: Build ← Authentication ← Get started ← Sign-in method ← Email/Password ← Enable ← Save.
   ثم تبويب Users ← Add user:
      Email: اسمك@alwa.app   (مثال: zirak@alwa.app)   Password: كلمة سر قوية 8+ أحرف.
   سوّي حساب لكل جهاز/شخص يدخل (مثال: laptop@alwa.app , phone@alwa.app , ali@alwa.app).
   ملاحظة: الإيميل وهمي ما يحتاج يكون حقيقي. وانت تدخل باسم المستخدم فقط (zirak) بدون @alwa.app.
   تبويب Settings ← User actions ← عطّل "Enable create (sign-up)" إذا موجود.

3) Build ← Firestore Database ← Create database ← Standard edition ← اختر أقرب موقع ← Production mode ← Enable.
   تبويب Rules: امسح كل شي والصق محتوى ملف firestore.rules بعد ما تبدّل الأسماء داخل القائمة
   بإيميلات حساباتك بالضبط، ثم Publish.
   (أي حساب مو مكتوب بالقائمة ما يقرأ ولا يكتب شي حتى لو سوّى حساب.)

4) Project settings (أيقونة الترس) ← General ← Your apps ← أيقونة </> (Web) ← سمّه ← Register app (لا تفعّل Hosting).
   انسخ القيم من firebaseConfig والصقها بملف firebase-config.js مكان كلمات PASTE.
   وإذا اسم المدير مو zirak غيّر OWNER_USERS (مثال: ["zirak","laptop"]). الباقي يدخلون كعمّال (الطلبيات فقط).
   (مفاتيح الويب هذي مو سرّية؛ الحماية الحقيقية هي الحسابات والـ Rules.)

======================= الجزء 2: نشر الموقع (اختر واحد، كلهم مجانيين) =======================
أ) Cloudflare Pages (أنصح فيه):
   dash.cloudflare.com ← سجّل مجاناً ← Workers & Pages ← Create ← Pages ← Upload assets (رفع مباشر)
   ← سمّ المشروع ← اسحب مجلد النظام كله (كل الملفات) ← Deploy. يعطيك رابط xxx.pages.dev.
   للتحديث لاحقاً: نفس الصفحة ← Create new deployment ← اسحب المجلد المحدّث.

ب) Firebase Hosting (نفس المشروع، يحتاج Node.js على اللابتوب):
   npm i -g firebase-tools ← firebase login ← داخل المجلد: firebase init hosting (اختر مشروعك، المجلد public = .، لا تستبدل index.html)
   ← firebase deploy --only hosting

ج) Netlify: app.netlify.com/drop (سجّل حساب حتى ما ينحذف الموقع بعد ساعة). الخطة المجانية فيها حد شهري للنشرات.

======================= الجزء 3: الاستخدام =======================
- افتح الرابط على كل جهاز وسجّل دخول مرة وحدة.
- الجوال: آيفون (Safari) مشاركة ← إضافة إلى الشاشة الرئيسية. سامسونغ (Chrome) ⋮ ← تثبيت التطبيق / Add to Home screen.
- لنقل بياناتك الحالية: من النظام القديم الإعدادات ← تحميل نسخة احتياطية، ومن الجديد الإعدادات ← استيراد نسخة.
- المؤشر بالهيدر: أخضر = متصل، أحمر = النت قاطع (الشغل يستمر ويتزامن لما يرجع).

حدود المجانية (Firebase Spark): 50 ألف قراءة و20 ألف كتابة باليوم، وهذا يكفي محل عادي.
إذا تخاف تتجاوز: لا تفتح الموقع بأجهزة كثيرة بنفس الوقت.

لتغيير كلمة سر أو حذف جهاز: Authentication ← Users ← (⋮) Reset password / Delete account.
إذا ضاع جهاز: احذف حسابه من نفس الصفحة وينقطع عنه الدخول.
