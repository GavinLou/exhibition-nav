--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg110+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: AI_Chat_Message; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: AI_Chat_Session; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: AI_Itinerary_Draft; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Assignment; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Attractions; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Attractions" VALUES ('fe3fc8e8-83cb-42b3-9242-adefa1c15138', '2c649760-3d3f-429b-9d57-0748616ef9e4', 'open', '/uploads/images/attractions/1.jpg');
INSERT INTO public."Attractions" VALUES ('9da51fd6-f5bf-4c2b-a8c9-ca5de5d687b7', '3aa3731e-34ca-4a0b-aba1-536a301d942e', 'open', '/uploads/images/attractions/2.jpg');
INSERT INTO public."Attractions" VALUES ('7d9fc9b5-adb9-4f33-9f8d-f4530cc3a45f', 'c10cbc7e-7881-4bf0-9562-4277f0e85a44', 'open', '/uploads/images/attractions/3.jpg');
INSERT INTO public."Attractions" VALUES ('63a01ed5-2b70-45c7-811f-377f6290659b', '709e0d71-57bb-4cd3-ad71-ae6bb64d8ac3', 'open', '/uploads/images/attractions/4.jpg');
INSERT INTO public."Attractions" VALUES ('d21c48f4-56ff-410c-883c-df6c332e3b69', '002b9f7d-f1bc-458e-badc-bad7c1822290', 'open', '/uploads/images/attractions/5.jpg');
INSERT INTO public."Attractions" VALUES ('ff2ef1e4-08c7-4b99-9042-9147b58631f0', '41093876-bdce-4815-9a8f-39e3eaf282b5', 'open', '/uploads/images/attractions/6.jpg');
INSERT INTO public."Attractions" VALUES ('2e4607c5-3260-4d17-8de0-973fefe112d5', 'ac1f395c-8444-4816-9742-92640b562ab3', 'open', '/uploads/images/attractions/7.jpg');
INSERT INTO public."Attractions" VALUES ('c9d003bd-b0ac-4ae5-8e73-422f0bee5d52', 'f8a4390f-6edf-4d6c-99ed-ea39d9eb52f9', 'open', '/uploads/images/attractions/8.jpg');
INSERT INTO public."Attractions" VALUES ('c6b30fa4-6eaa-4cf7-a46c-4a7b281b4a66', '8931a4a4-8bbf-44ae-97bc-c4a0f96aa34f', 'open', '/uploads/images/attractions/9.jpg');
INSERT INTO public."Attractions" VALUES ('fb008019-8b56-4740-b61c-39908e456e3f', '72b87fd4-1762-45fe-aca7-bedc0421d4af', 'open', '/uploads/images/attractions/10.jpg');
INSERT INTO public."Attractions" VALUES ('b0eb2cba-f92e-476c-9337-a5790c089496', '969c6918-2f66-44fd-8c64-28046011554d', 'open', '/uploads/images/attractions/11.jpg');
INSERT INTO public."Attractions" VALUES ('c8e67edc-4e03-436d-8e74-6d994766f820', '390393fd-d33d-47a2-9bcf-937dd5ffc566', 'open', '/uploads/images/attractions/12.jpg');
INSERT INTO public."Attractions" VALUES ('a993228f-976e-4018-949d-d83160b9bbfe', 'bf41a0f3-efe0-4b32-91c2-71baf91a099f', 'open', '/uploads/images/attractions/13.jpg');
INSERT INTO public."Attractions" VALUES ('404f3b29-b3bb-404c-8bd6-3b1b005c639d', 'c9baaf29-cd2b-4663-b14c-8f2102212c28', 'open', '/uploads/images/attractions/14.jpg');
INSERT INTO public."Attractions" VALUES ('6130615d-5fcf-4ccc-aca9-e1210260675f', 'c27e537e-e3b3-4913-9eaa-b17d5dffe19e', 'open', '/uploads/images/attractions/15.jpg');
INSERT INTO public."Attractions" VALUES ('2920a187-6b82-4bfd-b9ae-6de4944d01a7', '26081311-cc36-46ab-ba2a-adf04048e6eb', 'open', '/uploads/images/attractions/16.jpg');
INSERT INTO public."Attractions" VALUES ('dc2aee65-de83-455e-8443-75f681ad85e4', '6e823a11-68a1-4357-aae6-298a1f24324b', 'open', '/uploads/images/attractions/17.jpg');
INSERT INTO public."Attractions" VALUES ('e38f1743-e90e-49be-9ca4-851f3c45b0b4', 'de39203b-bdd7-493d-ad87-8b9ae20f2ea6', 'open', '/uploads/images/attractions/18.jpg');
INSERT INTO public."Attractions" VALUES ('e70e5af4-0c13-4cae-bc04-1f0a787ed5a7', 'a999b13b-4528-406a-a3de-6e85b3e3189e', 'open', '/uploads/images/attractions/19.jpg');
INSERT INTO public."Attractions" VALUES ('5d3c9f1e-46c7-46d9-a96d-53b66581a666', '24d38e3e-94fb-4635-849e-ce23fc655d50', 'open', '/uploads/images/attractions/20.jpg');
INSERT INTO public."Attractions" VALUES ('c8f289ac-1d5d-4912-a25a-d89120b2a008', 'a8c29ae2-1a56-43bd-af7a-c208a083fe31', 'open', '/uploads/images/attractions/21.jpg');
INSERT INTO public."Attractions" VALUES ('48a7c6a7-6f2d-4a8d-a3bf-d7f339dd2b12', '5f886f0a-73f8-44ab-b502-080d3f98efb0', 'open', '/uploads/images/attractions/22.jpg');
INSERT INTO public."Attractions" VALUES ('2d9c27e1-082d-4832-b623-de04d9340c74', 'fd4e43f0-0a03-433c-9bcc-60dd73d8f511', 'open', '/uploads/images/attractions/23.jpg');
INSERT INTO public."Attractions" VALUES ('6b817a09-b8f0-42af-880f-28a08582c18d', '24062b8b-c4da-48ab-859d-470db30490f3', 'open', '/uploads/images/attractions/24.jpg');
INSERT INTO public."Attractions" VALUES ('a8de4c89-f2ea-478b-a365-d276dc299702', '1aba9f2b-df38-4b8a-b5bb-a629dc412b3d', 'open', '/uploads/images/attractions/25.jpg');
INSERT INTO public."Attractions" VALUES ('8b565eeb-510a-44a7-b784-30f8496ef339', '7a5ad028-4f13-4781-bddf-6f3bd4af5783', 'open', '/uploads/images/attractions/26.jpg');
INSERT INTO public."Attractions" VALUES ('bdd01edf-fcae-47e3-a7b6-871b95c8f03d', 'c2344671-2cd9-474c-bbf0-33b12671a2f0', 'open', '/uploads/images/attractions/27.jpg');
INSERT INTO public."Attractions" VALUES ('89617dc5-68fb-4611-a797-e1f936a6370a', 'db1177ff-8748-425d-959d-d19fbaed57d1', 'open', '/uploads/images/attractions/28.jpg');
INSERT INTO public."Attractions" VALUES ('1e54c748-b27c-49b5-9fbb-1e7e01eeda83', 'b8b36cd1-9b41-4a58-85a0-0dc1085b62fe', 'open', '/uploads/images/attractions/29.jpg');
INSERT INTO public."Attractions" VALUES ('8606eaf8-34be-4cbd-bcbc-019e8ddd2656', '5fda1ee5-8ece-4c09-9584-3f52a3e4a6b1', 'open', '/uploads/images/attractions/30.jpg');
INSERT INTO public."Attractions" VALUES ('19070768-5976-46ee-a5ed-55e427977235', '53cb3a9f-f35a-4521-9103-4b6fc255770f', 'open', '/uploads/images/attractions/31.jpg');
INSERT INTO public."Attractions" VALUES ('ae16fe40-f952-4b0b-a1ec-b4c3b7d8e417', '93ef2387-f2b8-4b5e-a04f-1a5a8ff92007', 'open', '/uploads/images/attractions/32.jpg');
INSERT INTO public."Attractions" VALUES ('cd50ddb2-938e-4364-98f2-150a643c5035', '44b8f1d9-8769-4118-9626-51d67831f8d7', 'open', '/uploads/images/attractions/33.jpg');
INSERT INTO public."Attractions" VALUES ('877633c0-191b-4752-95e7-673fb876592e', 'd4acc003-d75c-4326-baf1-1509c2efc7e4', 'open', '/uploads/images/attractions/34.jpg');
INSERT INTO public."Attractions" VALUES ('b2273943-5ac9-4706-8796-af801c0d6610', '12ebac70-169f-4ac1-b5a9-07a679bbc5b0', 'open', '/uploads/images/attractions/35.jpg');
INSERT INTO public."Attractions" VALUES ('6a465837-a8c3-4807-8383-26b235affc7e', '8b36f6f4-7273-49e6-8742-1cb39d496ff5', 'open', '/uploads/images/attractions/36.jpg');
INSERT INTO public."Attractions" VALUES ('a3b4182d-55c7-42dc-bd4b-41d33111dc6d', 'ab2d5ed0-ec16-4af3-af58-9ddd332128e4', 'open', '/uploads/images/attractions/37.jpg');
INSERT INTO public."Attractions" VALUES ('ea7527b4-ab81-465b-b124-5e551cf79542', 'd34ca4f5-6992-4b38-acb5-935aaf7e9e03', 'open', '/uploads/images/attractions/38.jpg');
INSERT INTO public."Attractions" VALUES ('34f68c91-adc9-4515-ab3d-58cd8c150320', '735ce189-c11b-43b5-a3fa-3e4c4a2c7e53', 'open', '/uploads/images/attractions/39.jpg');
INSERT INTO public."Attractions" VALUES ('8033442d-1693-4541-87fe-af44f03efd19', '0385ad02-8000-4db6-abcf-4322860e95d8', 'open', '/uploads/images/attractions/40.jpg');
INSERT INTO public."Attractions" VALUES ('ffe264d2-a4ac-46b7-9de7-50c53b9aa3d2', '13f73bab-def3-442e-a82e-77c74df7503b', 'open', '/uploads/images/attractions/41.jpg');


--
-- Data for Name: Attractions_Translations; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Attractions_Translations" VALUES ('8d6573d2-2f77-4785-a5e6-244810880e27', 'a993228f-976e-4018-949d-d83160b9bbfe', '本館一樓', 'zh_TW', '佛陀紀念館由高僧與紀實保存合刊組建。「本館」是佛陀紀念館的主體建築，也是舍利之所在。代表「本願尊稱年化佛」，高五百五十公尺。台基約三千七百坪，外觀造型仿印度摩訶菩提，又具有印尼婆羅浮屜的方法構築；四個角落聳立四聖塔，供奉有文殊吉首菩薩大奇普賢、崇身行悲功德滿俊。\n本館底層外飾黃砂石，四周高牆圍繞，仿石窟式樣，正前中央共兩等重直門框，做為玄關入口，外觀宏偉壯觀，融合古、今日、中西文化。\n本館一樓有三殿、四個常設展；二樓則有大重堂及四個特設展覽；三樓仍非中軸線上，前方為毗盧舍那由觀音殿，中為金佛殿，後為玉佛殿。另設佛陀山法寶堂、佛陀紀念館，佛陀紀念館是永續經營的社會教育，更獲得經紀人二十多人的專業，將「大重堂」讓大眾可在欣賞海內外著名的藝術演出；另有四個展覽廳，引進全球尊期展覽會物珍品與珍玩工藝展示。\n塔與數位於本館高處，朝夕硬體中神聖而多元化且人心的「心的工程」；方形明房四邊設有一、再，塔上置有彩碎浮雕，以磚石彩繪，造型極佳珍貴。金黃明亮。「百萬心經入法身」是為了奠基佛陀紀念館而發起的全球抄經活動，來自全世界的一百萬份心經，字字句句、每一句都包含十方諸佛之和諧，除了陣藏於本館外，還仔細存放在這座歷史寶庫。\n同樣眾信徒希望加深擴大與信仰的心理，通連不只是拜拜、佛光大佛分享家、活動，做出做好的偉大價值。請發起回家自立書，打造自己一心樣式。佛陀紀念館有機會邀請。將佛的光明和甘露帶回家中。', '/uploads/videos/attractions/13.mp4', '/uploads/audio/attractions/13.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('aaa58d54-5f5e-40db-be71-a9a398b5fcb4', '9da51fd6-f5bf-4c2b-a8c9-ca5de5d687b7', '大佛平台', 'zh_TW', '大佛平台是連結本館與佛光樓的平台，佇立在此可近距離仰望大佛，感受大佛的攝受力，是大眾與大佛最貼近核心之處，星雲大師為了「給人歡喜、給人方便」，開放一處可容納兩千人禮佛的寬廣之地，並不定期舉辦開山、繞塔、誦經祈禱等修持活動。\n\n在大佛平台可南望靈山，北觀恆河、祇園，遠眺成佛大道，繚繞的大武山雲氣，及高屏溪的點點夕陽盡在眼前。\n\n大佛平台，四聖塔於每週六下午由法師帶領大眾繞塔，陀羅尼經經幢釋迦牟尼佛」佛號，並行繞塔。所謂眾福如見佛。在《右繞佛塔功德經》云，「一切諸天龍、夜叉鬼神等，皆親近供養。斯由右繞塔。在在所生處，遠離於八難，常生無難處。斯由右繞塔。於一切生處，念慧常無失，具足妙色相，斯由右繞塔。往來天人中，福壽悉長遠，常獲大名稱，斯由右繞塔。於陰若墮時，當生福德家，清淨種姓中，斯由右繞塔。儀貌當端正，富貴多財寶……」由此可知繞塔功德不可思議，能清淨本心，累積福數無量無邊。\n您有多久沒有幕鼓心洗了？尤且在佛陀腳下，靜心抄寫一部《心經》，或是修藝大師的《榮譽讚》，大佛平台設有一處「抄經堂」，所謂「抄寫一逼，勝過閱讀十遍」', '/uploads/videos/attractions/2.mp4', '/uploads/audio/attractions/2.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('7357caac-5f5e-4615-a796-5ab3d2d77b60', '7d9fc9b5-adb9-4f33-9f8d-f4530cc3a45f', '大佛平台抄經堂', 'zh_TW', '「抄經」既能靜心，又能祈福，抄寫《心經》，是修心養性、深入經藏的修行法門。端坐揪心，配合呼吸，專注筆下的一筆一劃，內心清定，更能體會遠離塵囂。\n\n弘一法師曾談抄經十大利益\n一、從前所作囉囉罪過，輕者立即消滅，重者也得轉輕。\n二、常得吉神擁護，一切瘟疫、水火、盜賊、刀兵、牢獄之災，悉皆不受。\n三、夙生怨對，咸蒙法益，而得解脫，永免尋仇報復之難。\n四、夜叉惡鬼，不能侵犯；毒蛇餓虎，不能為害。\n五、心得安慰，日無險事，夜無惡夢，顏色光澤，體力充盛，所做吉利。\n六、至心奉法，雖無希求，自然衣食豐足，家庭和睦，福壽綿長。\n七、所言所行，人天歡喜。任到何方常為多眾親近敬愛，恭敬禮拜。\n八、愚痴轉智，病者轉健，困者轉亨。不願為婦女者，報盡之日，皆轉男身。\n九、永離惡道，受生善道。相貌端正，天資超越，福祿殊勝。\n十、能為一切眾生，種植善根。以眾生心，作大福田，獲無量勝果。所生之處，常得見佛聞法。直至三慧宏開，六通親證，速得成佛。\n\n抄經不只恰養佛性，更是以文字般若，契入佛心，累積功德資糧，增長智慧，培養善良根德因緣。找到心靈的依處。', '/uploads/videos/attractions/3.mp4', '/uploads/audio/attractions/3.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('41de8802-9cce-40b3-9fea-2903ef66ad0c', 'bdd01edf-fcae-47e3-a7b6-871b95c8f03d', '八道塔', 'zh_TW', '八道塔是從佛教的「八正道」，即「正見、正思惟、正語、正業、正命、正精進、正念、正定」而來，八正道是引領我們走向涅槃解脫的正道。八道塔為客堂，播放佛陀紀念館影片、簡報及提供民眾喝茶、休憩之場所。', '/uploads/videos/attractions/27.mp4', '/uploads/audio/attractions/27.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('f0068729-436c-47f4-b4ca-918dc3fbc253', '6b817a09-b8f0-42af-880f-28a08582c18d', '五和塔', 'zh_TW', '五和的意涵為「自心和悅、家庭和順、人我和敬、社會和諧、世界和平」。五和塔是「喜慶之家」，以「家庭」出發，從男女結婚的「佛化婚禮」，到喜獲麟兒的「毓麟之禮」、孩子的「成年之禮」、長輩生日的「壽誕之禮」，或學生「畢業典禮」，舉凡喜慶之事，皆可在此以佛教儀式完成「生命禮儀」，洋溢的幸福氛圍隨處顯現，並可溫馨合影留念。', '/uploads/videos/attractions/24.mp4', '/uploads/audio/attractions/24.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('9346cac3-7a9c-4ce4-8138-10b68b5020be', 'd21c48f4-56ff-410c-883c-df6c332e3b69', '四聖塔/觀音塔', 'zh_TW', '在本館上方四聖塔之一的觀音塔供奉觀音菩薩，觀音菩薩因「大悲心」而遊諸世界，尋聲救苦，千處祈求千處應，實踐的是「眾生無邊誓願度」的大悲。\n文殊菩薩是中國四大菩薩道場，山西五台山是文殊菩薩道場。', '/uploads/videos/attractions/5.mp4', '/uploads/audio/attractions/5.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('5195e7c2-52d1-4540-a134-04be7bfd5aa1', 'ff2ef1e4-08c7-4b99-9042-9147b58631f0', '四聖塔/文殊塔', 'zh_TW', '在本館上方四聖塔之一的文殊塔供奉文殊菩薩，文殊菩薩因有「大智慧」能讓人從迷取覺、從非而是，是「法門無量誓願學」的深刻表達。', '/uploads/videos/attractions/6.mp4', '/uploads/audio/attractions/6.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('7bd28dea-54d9-4ef3-971c-6f8c4ce4f0f1', '2e4607c5-3260-4d17-8de0-973fefe112d5', '四聖塔/地藏塔', 'zh_TW', '四聖塔之一的地藏塔供奉地藏菩薩，地藏菩薩因有「大願力」而發心到地獄度眾生，救度眾生貪瞋癡煩惱業集的痛苦，猶如出地獄的刀山劍樹，是「煩惱無邊誓願斷」的功德。', '/uploads/videos/attractions/7.mp4', '/uploads/audio/attractions/7.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('9792585a-27b4-4dbc-965a-5b856e88a3b6', 'c9d003bd-b0ac-4ae5-8e73-422f0bee5d52', '四聖塔/普賢塔', 'zh_TW', '四聖塔之一的普賢塔供奉普賢菩薩，普賢菩薩因「大行力」而導萬行歸極樂，讓所有苦難的眾生都能得救，展現的是「佛道無上誓願成」的悲心。\n佛光一滴', '/uploads/videos/attractions/8.mp4', '/uploads/audio/attractions/8.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('42d8d920-09ef-4ebc-a934-314afcebf4d6', 'c6b30fa4-6eaa-4cf7-a46c-4a7b281b4a66', '佛光一滴', 'zh_TW', '全台唯一在大佛底下的餐廳「佛光一滴」，其麵、飯，乃至小菜、小披薩、漢堡、潛艇堡及鬆餅等都出自法師與義工服務大眾的歡喜心。中式小菜如家醬苦瓜、桂花蜜藕、豆腐沙拉、香辣蹄筋、五味茄子、紫米糕，素食壽司都是明星商品。\n服務電話 07-656-3033分機4300\n供餐時間：\n平日 11:00-17:00 (最後受理點餐為16:30)\n假日 11:00-17:00 (最後受理點餐為16:30)', '/uploads/videos/attractions/9.mp4', '/uploads/audio/attractions/9.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('23148b52-6d54-43f3-b89c-dfecc6da3459', 'a8de4c89-f2ea-478b-a365-d276dc299702', '六度塔', 'zh_TW', '六度塔，是以佛教「布施、持戒、忍辱、精進、禪定、般若」命名，塔內為常設展，有「公益信託星雲大師教育基金」、星雲大師「一筆字」書法墨寶及 3D影片欣賞。\n所謂的「一筆字」，即是一下筆就不停止的寫完一幅字，94高齡的星雲大師，憑藉著「心眼」和「法眼」書寫「一筆字」，書體卓然成一家。\n塔內還可觀賞「一筆字」3D影片(9:30-16:30)，了解大師如何用「心」寫字。現場更提供一筆字墨寶拓印，讓每位遊客拓印專屬於自己的墨寶！', '/uploads/videos/attractions/25.mp4', '/uploads/audio/attractions/25.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('6267ed34-4dc2-48e6-9028-62c25c0aa608', '8b565eeb-510a-44a7-b784-30f8496ef339', '七誡塔', 'zh_TW', '七誡即「誡煙毒、誡色情、誡暴力、誡偷盜、誡賭博、誡酗酒、誡惡口」，藉由七誡的奉行，讓個人、家庭到社會形成一股善美清淨的「正能量」。七誡塔是客堂，提供參訪民眾喝茶、休憩及談敘之用。\n七誡，是從佛教的「殺、盜、淫、妄、酒」等五戒，增加誡賭博、誡暴力，成為七誡。', '/uploads/videos/attractions/26.mp4', '/uploads/audio/attractions/26.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('dce42c17-c519-41ba-a319-db5c20277240', 'dc2aee65-de83-455e-8443-75f681ad85e4', '小品店', 'zh_TW', '小品店（Shopping Center）位在佛光大道、施茶亭旁，是一處集文物、書香、沉香及咖啡香於一室的世外桃源。小品店內設有流通處、滴水食堂和太禾賞。流通處陳列書籍、佛像、佛教文物及精品，可供觀賞或選購；滴水食堂供應中式輕食及冷熱飲，「太禾賞」在此駐店服務，和您一起喝茶、品香、談香道。\n\n店內設計具有新古典華麗風，簡單而時尚，在舒適優閒的氛圍裡，可讀書、賞文物、品香；室外也設有座位區，可觀賞高屏溪斜張橋的景觀，視野寬敞，清淨自在，是忙裡偷閒的好去處！館內備有小客車及遊覽車停車場，地點適中，停車便利，適合公司行號、機關學校開會或聚餐使用，歡迎個人及團體預約。\n\n服務電話 07-656-3033 分機4358\n供餐時間\n平日：11：00-17：30\n假日：11：00-18：30', '/uploads/videos/attractions/17.mp4', '/uploads/audio/attractions/17.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('e72520fa-f061-4e14-b48f-8e99442d2eea', '1e54c748-b27c-49b5-9fbb-1e7e01eeda83', '古德偈語與佛陀行化本事', 'zh_TW', '整個佛陀紀念館都是佛陀的課堂，在佛館菩提廣場兩側廊道壁面上，刻有二十二幅半浮雕的「佛陀行化本事」，其中再搭配二十二幅的「古德偈語」，述說著佛陀行化社會各階層的故事，將其一生重要的弘化事跡和教法，以書畫展現出來。\n「佛陀行化本事」巨幅畫作是由藝術家施金輝所繪，以戲劇張力的畫筆，用最適切的構圖、線條與意象，忠實地呈現佛陀行化、慈悲喜捨的精髓。這二十二幅畫作，後由葉先鳴老師水泥雕塑、彩繪家陳明啟製作成二十二面浮雕，讓參訪者隨著一幅一幅行化故事，看見佛的容顏、聽到佛的音聲、領悟佛的教法，學習佛陀不捨一切眾生的慈悲精神。\n佛陀行化事跡包含了佛陀為父擔棺、到忉利天為母說法、為弟子縫製袈裟、拈花微笑說法、用善巧方便度化摩登伽女和鬼子母等等。每一面「佛陀行化本事」都有中英文的解說牌，字體大小清晰可閱讀，舒適的牌面設計，是星雲大師用意深遠的安排。\n「古德偈語」亦序列於兩側廊道，為了讓人們明瞭佛陀的人間性格與大眾性格，以書法文字表達佛教義理的內涵；星雲大師特別自佛教經典中，精選讚佛功德的詩偈與經文，於2010年完成書寫。\n內容有《華嚴經》的「大海之水可飲盡，剎那心念可數知，虛空可量風可繫，無能說盡佛功德。」及古德所撰的「佛地人多心甚閒，日看飛禽自往還；有求莫如無求好，進步哪有退步高。」等等，如實地刻在黑色花崗岩上，體現了星雲大師書法的線條與空間之美。', '/uploads/videos/attractions/29.mp4', '/uploads/audio/attractions/29.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('37499c60-b2be-4a62-a886-cd6d2ff38bb9', '8606eaf8-34be-4cbd-bcbc-019e8ddd2656', '菩提廣場', 'zh_TW', '經過成佛大道，即是可供萬人以上集會的「菩提廣場」，廣場上經常舉辦大型祈福法會或活動。廣場前方為萬人照相台，後方有八宗祖師，「十八羅漢」尊像矗立於兩側。', '/uploads/videos/attractions/30.mp4', '/uploads/audio/attractions/30.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('521ba844-6981-44f8-b7f1-2d1942e76406', '19070768-5976-46ee-a5ed-55e427977235', '八宗祖師像', 'zh_TW', '佛陀為眾生廣說八萬四千法門，從聽經聞法、法義薰習而領略教理是為「解門」，依循教理實踐修行是為「行門」，八宗祖師其實是行解兼修的，如星雲大師所說：「將書本所學的知識與生活的體驗連接起來，知行合一，解行並重。」即是人生修行道路的不二法門。凝視八宗祖師，雖經歷了許多滄桑和困蹇，但卻澆不熄弘揚佛法的信念，他們的精神與典範將永遠常懷世人心中，佛光普照。', '/uploads/videos/attractions/31.mp4', '/uploads/audio/attractions/31.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('7efe9ac9-349c-4cfb-944c-f18fdfd7ff15', '63a01ed5-2b70-45c7-811f-377f6290659b', '佛光樓', 'zh_TW', '佛光樓，位於佛光大佛座下，提供佛光山功德主回來到佛陀紀念館參加年度活動時，可享賓至如歸般的優渥住宿區。佛陀紀念館每年4-12月舉辦「心的旅程」活動時，參加的學員也會很榮幸有一人套房的住宿體驗。佛光樓最重要的，是九樓國際會議廳。適合國際學術研討會或學術團體、企業主管高層會議、各種大型活動會議申請使用，會議、住宿一體，落實了佛光山開山星雲大師「四給」的精神。\n佛陀在菩提樹下，因徹悟「四聖諦」—苦、集、滅、道等真理而開悟。四聖諦是佛法的綱要，三藏十二部經典的根本。隨著佛教的發展，義理付諸行動與實踐，成為「四弘誓願」—眾生無邊誓願度，煩惱無盡誓願斷，法門無量誓願學，佛道無上誓願成。而四弘誓願的代表者，就是象徵悲、智、願、行的四大菩薩。', '/uploads/videos/attractions/4.mp4', '/uploads/audio/attractions/4.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('3578685f-5dfd-4b9b-87a6-fc71f1abc8da', 'c8e67edc-4e03-436d-8e74-6d994766f820', '玉佛殿', 'zh_TW', '佛陀紀念館的「諦聽之聲—佛牙舍利」，世界僅存三顆，佛牙舍利誠如阿含經典記載身，其珍貴與可見世界佛法的真實。全世界佛徒此生崇仰。另一處在錫蘭、佛牙舍利全求僅存三顆，其中一顆就在佛陀紀念館的玉佛殿。參訪必不能錯過此景點，才不虛此行。\n\n星雲大師在五機般若下：「佛陀在特斯克演出，佛寶速度我出生；願我此身多福德，至今才見如來牙」，達大師前有此遺憾，佛牙舍利傳承保存至今。不論您是否為佛教徒，都應前往瞻仰禮拜，開啟世界級的眼界。\n\n此外，玉佛殿內供奉一尊由緬甸珍白玉雕刻成的臥佛，兄弟各手抓四個人，佛牙舍利就安奉在臥佛上方。臥佛兩旁有大面大的彩色浮雕，右側為東方琉璃世界圖，主尊藥師佛坐於青色琉璃。兩大脇侍為日光及月亮菩薩。左側為西方極樂世界圖，中央為阿彌陀佛，兩大脇侍為觀音、大勢至菩薩。縱兩大輻經變圖，皆是由天然玉石手工鑲嵌、雕刻，藍色合成，大型琉璃精雕工藝平，精細且構造巧思。\n\n▲金佛週曆詳修：每日13:00及14:00 (修持時間與開放參觀)\n參修方式：取班後排隊入館\n參拜時間：30分鐘\n聯絡電話：(07)656-3033分機4213\n\n▲ 2012/6/30(六)～9/9(日)修持世界', '/uploads/videos/attractions/12.mp4', '/uploads/audio/attractions/12.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('843e778e-7a26-4e2f-8a27-41357d918a80', 'e70e5af4-0c13-4cae-bc04-1f0a787ed5a7', '萬人照相台', 'zh_TW', '通過成佛大道，拾級而上，來到「萬人照相台」，經過的37個階梯，象徵「三十七道品」，即是佛教修行實踐的法門。立於台階上，面向東方，背後是一尊世界最高的銅鑄坐佛；轉身向西，有八座寶塔為背景，視野遼闊，是來訪團體拍照最佳之地。', '/uploads/videos/attractions/19.mp4', '/uploads/audio/attractions/19.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('102ad0cd-1821-4abe-8916-9afb2b1d50b9', 'fb008019-8b56-4740-b61c-39908e456e3f', '觀音殿', 'zh_TW', '「普陀洛伽山觀音殿」上方殿名，由星雲大師命名。殿內主尊千手千眼觀音為藝術家楊惠姍女士所創作。藝術風格取自現代 (1271～1368) 嚴官格調為基本塑造，法相莊嚴，用色古雅；脇侍善財、龍女、活潑生動。具明代 (1368～1644) 造像特色。四周壁面玻璃與環繞三十三觀音相，則為佛光緣美術館館長如常法師所作。前後遠近、變換相續，示現重重無盡的華嚴世界。\n\n星雲大師說：「我這根釋（華嚴經）中『須彌藏芥子，芥子納須彌』的理念而成，這室中的千手千眼觀音，是佛陀紀念館弘法的代表，一進門就可以看到，因為觀音菩薩象徵慈悲，代表佛陀精神普及於一切。」\n\n殿內地面以黑五儲石取代傳統地磚。香榭暖金以中軸線做成階梯式的開發，在多重光影中祈福祝禱，深受感動。參觀大眾在法師及義工導引下，前來許願池祈福，即有恭財富！及龍女出生竹鹽水，代表觀音菩薩。千處祈求千處應。祈禱大覺團、擴大悲願的心靜意成，殿外秩序井然有序（觀世音菩薩普門品）經文，雕刻牆面。彷佛莊嚴體現。', '/uploads/videos/attractions/10.mp4', '/uploads/audio/attractions/10.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('a40151df-4940-4274-bb64-a270c01236d7', '48a7c6a7-6f2d-4a8d-a3bf-d7f339dd2b12', '三好塔', 'zh_TW', '三好的意思，就是「身做好事，口說好話，意存好心」，身、口、意三業清淨。三好塔目前是聯合辦公室，內設有會議室、會客室，是一座現代多功能的場所。', '/uploads/videos/attractions/22.mp4', '/uploads/audio/attractions/22.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('be9bdfed-d78e-4970-8d37-9306c95a347e', 'e38f1743-e90e-49be-9ca4-851f3c45b0b4', '祇園', 'zh_TW', '在佛陀說法四十九年中，有二十五年的時間經常駐錫祇園，包括《阿彌陀經》、《金剛經》等佛弟子耳熟能詳的經典，就是在這裡講說。「如是我聞，一時，佛在舍衛國祇樹給孤獨園······」佛在印度祇園，佛在台灣佛光山佛陀紀念館，星雲大師構築了一處青翠祇園，讓大地花樹為眾生說法。', '/uploads/videos/attractions/18.mp4', '/uploads/audio/attractions/18.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('de151cee-7203-441c-be7b-05371df90645', '5d3c9f1e-46c7-46d9-a96d-53b66581a666', '一教塔', 'zh_TW', '一教，就是指「一切的佛法都在人間」。星雲大師說，人間佛教即是「佛說的、人要的、淨化的、善美的；凡是有助於幸福人生增進的教法，都是人間佛教」。一教塔平時提供會議、活動、課程之用途，舉凡義工講習、教育培訓等，各級學校、各個團體，皆可申請場地借用。', '/uploads/videos/attractions/20.mp4', '/uploads/audio/attractions/20.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('d46e07b2-4197-4a92-95a2-d165122c9b67', '877633c0-191b-4752-95e7-673fb876592e', '雙閣樓 滴水坊', 'zh_TW', '池畔上朵朵的荷花，襯托著金黃色雙閣樓的雅致，雙閣樓一樓為滴水坊，從紅燒麵、炒麵、香椿抓餅到蘿蔔糕，以及自製的愛玉和各式小菜，經濟又實惠，很受遊客喜愛。\n\n服務電話 07-656-3033分機4335\n供餐時間\n平日：11：00-17：00 (點餐至16:30)\n假日：11：00-17：00 (點餐至16:30)', '/uploads/videos/attractions/34.mp4', '/uploads/audio/attractions/34.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('d9869565-0552-4c13-af0f-8edc25ef4542', 'b2273943-5ac9-4706-8796-af801c0d6610', '樟樹林 滴水坊', 'zh_TW', '沿著祇園小徑，隱約聞到樟樹釋放出的清香，遠遠即見一彎半月形的「樟樹林滴水坊」。進門剛坐下，還未點餐，服務人員立刻端上一碗臘八粥，溫馨滿懷。原來，滴水坊有「以粥代茶」的特有文化，以紅蘿蔔、青江菜、米豆、油條等食材熬煮的平安粥，看似簡單卻又不凡，代表著星雲大師的感恩心及回饋心，一碗平安粥如暖流般，注入人們的心和胃。\n這裡主推一飯一麵，品嚐佛光麵的湯頭，一股豆香味在唇齒間慢慢散開，這是一道大師親自傳授、指導的創意料理，以豆漿熬出香濃的湯汁，令人難以忘卻舌尖綿綿的滋味。\n樟樹林滴水坊有一特別之處，大師秉持素食結緣的初衷，餐點不定定價，讓遊客隨喜投功功德箱。\n服務電話 07-656-3033分機4062\n供餐時間\n平日 11：00-15：00\n假日 11：00-15：00', '/uploads/videos/attractions/35.mp4', '/uploads/audio/attractions/35.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('7bb133c5-505e-46c7-b965-c11f95619c52', '6a465837-a8c3-4807-8383-26b235affc7e', '禮敬大廳', 'zh_TW', '「禮敬」，具有「禮敬諸佛」之意，是進入佛館的第一棟建築物；佔地1400坪，地上三層，地下一層，宛若城堡聳立。星雲大師為了大眾的需求，細心規劃設計，在這裡，可以獲得貼心的接待與服務。\n\n禮敬大廳以接納公益性的服務，因應需求，安定初次造訪的賓客。廳內各類諮詢、路線指引、輪椅借用等，讓人安心。用餐、喝水、洗手都方便，也能迅速找到場所，處處貼心，乃至等人暫留，也有紀念品區可以逛。\n\n進入禮敬大廳之前，在門口左右，各有一隻高達5公尺，長達6公尺的獅子及大象，帶著幼獅、象群歡迎來賓。獅象雕塑有別於傳統，禮敬大廳取代天王殿的方式，更是一項創新。此處彰顯了以人為本的深遠意涵，也表達了對佛陀的尊崇恭敬，因為佛陀紀念館就是佛陀的家。\n\n星雲大師說：「今後的時代、社會，必定是一個服務的時代與社會，當民眾進到禮敬大廳，享受各種接待服務的同時，透過整面大玻璃望去，大佛、寶塔映入眼簾，立刻給人一種心靈的震撼。」', '/uploads/videos/attractions/36.mp4', '/uploads/audio/attractions/36.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('30c8c9af-e5b6-4f3f-8912-19c7fb1d9229', 'a3b4182d-55c7-42dc-bd4b-41d33111dc6d', '禮敬大廳 滴水坊', 'zh_TW', '禮敬大廳是進入佛陀紀念館第一座建築物，為提供信眾方便用餐，在廳內一樓亦設有滴水坊。溫馨典雅的室內設計，以俐落簡潔的線條搭配淡雅的色系，呈現寬敞潔淨的用餐環境；提供中式料理，是參觀佛陀紀念館之餘，最適合休憩、聊天、品嚐素食的好地方。餐點主打星雲大師最推崇的簡食代表－「皇帝豆麵」、「翡翠菜飯」，還有精緻美味的小菜，如花生豆腐、泡菜黃豆芽、毛豆等，選用新鮮的食材及用心的料理，在您品嘗美味餐點的同時，亦把平安、吉祥帶回家。\n服務電話 07-656-3033分機4018\n供餐時間\n平日：11:00-14:30、15:30-17:30\n假日：11:00-14:30、16:30-18:30', '/uploads/videos/attractions/37.mp4', '/uploads/audio/attractions/37.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('6e58a91c-b224-4c65-9da8-1b90c29203f7', 'ea7527b4-ab81-465b-b124-5e551cf79542', '禮敬大廳二樓 百味軒自助餐', 'zh_TW', '「百味軒自助餐廳」位在禮敬大廳二樓，採自助餐式服務，菜色豐富，經濟實惠。除了主食飯、麵和湯之外，尚有數道佳餚供您選擇，全是佛光山招牌素菜。廳內空間寬敞明亮，大武山的美景在這一覽無遺。若於假日，請提早前往用餐，以免向隅。\n供餐時間\n平日 11：00-13：00\n假日 10：30-14：00', '/uploads/videos/attractions/38.mp4', '/uploads/audio/attractions/38.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('53622fc4-662f-443f-b193-f9a09e2f59c7', '34f68c91-adc9-4515-ab3d-58cd8c150320', '禮敬大廳二樓 禪悅齋 合菜圓桌', 'zh_TW', '「禪悅齋」，以當季新鮮食材烹調，兼顧健康、營養與美味的蔬食合菜。設有室內宴會廳，是家庭聚餐、工商聯誼或是喜慶宴客的最佳選擇。歡迎公司行號或社會團體預約。\n服務電話 07-656-3033分機4021 、4023\n供餐時間\n平日 11：00-13：00\n假日 10：30-14：00', '/uploads/videos/attractions/39.mp4', '/uploads/audio/attractions/39.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('4c860b4b-9853-4cf3-9056-b9c6b7ed5801', '8033442d-1693-4541-87fe-af44f03efd19', '千家寺院百萬人士功德芳名碑牆', 'zh_TW', '在成佛大道兩側的風雨走廊內，黑色花崗岩上刻滿了千家寺院、百萬人士的功德芳名，他們是建館護持的功德主們。星雲大師說：「一佛出世，千佛護持，因為有你們，才有今天的佛陀紀念館。」館內的一樑一柱、一花一草，都是眾志成城，以功德芳名碑牆感念眾人的成就，讓善心善念永世流傳。\n本著「十方來，十方去，共成十方事；萬人施，萬人捨，同結萬人緣」的理念，全面實施免費入館。但為持續環境維護與館內各項支用，除設立「佛陀紀念館護持委員會」，也開放個人隨喜贊助。', '/uploads/videos/attractions/40.mp4', '/uploads/audio/attractions/40.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('9804a77d-8a6f-4227-9dd5-3d22b8eeb53e', 'ffe264d2-a4ac-46b7-9de7-50c53b9aa3d2', '犀牛區', 'zh_TW', '星雲大師說：「每一種動物都有其特性和存在的價值。」會動會叫的動物雖然是雕塑，但活靈活現，讓人懂得天地之間萬物共生共榮，保護動物及生態保育的信念，都是生命教育的一環。\n佛陀紀念館提供許多戶外空間，榕樹林下設有可互動式的動物家族裝置，會叫、會動的吉祥動物們隱身在此，歡迎大小朋友一起來發現驚喜！', '/uploads/videos/attractions/41.mp4', '/uploads/audio/attractions/41.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('23c1828f-8bbd-4ad8-9c82-6baf05174004', '404f3b29-b3bb-404c-8bd6-3b1b005c639d', '大覺堂', 'zh_TW', '大覺堂內之情境充滿動態，彷彿置身在佛國世界般。佛陀說法的音聲，很真實迴於空中，雄厚、莊嚴、慈悲，遙遠而宏亮，字字句句透入人心，讓來到這裡的參訪者，都能帶著歡喜與平安的感受回家。\n「大覺堂」是星雲大師把經典上文字的描寫，化現為立體的空間，將劇場的理念結合在修行概念裡，運用高科技與多媒體裝置，帶您回歸佛陀說法的時代，產生最觸動人心的共鳴。\n挑高三層樓的空間規劃，可以容納近兩千人次的專業劇場，具有多功能與高科技的設備，包括三層升降舞台，讓各種的表演形式，都能在大覺堂完美呈現。\n大覺堂的建築內部採用各項先進設施及精良材質，具有世界一流的水準，並以提升融合宗教藝術為首要目標，邀請國內外知名表演團體及藝術家演出，是一座宗教、文化最閃亮的舞台，為臺灣表演藝術的指標。\n中央造型主燈，利用漸進式燈光效果，呈現蓮花的一開一合。蓮花周圍的祥雲，則是利用燈光色彩的變化，營造出七彩雲朵效果，以表達「諸佛海會雲來集」的意涵。\n蓮花及雲朵中間有全台第一座360度外投式環型螢幕，可以看到從天而降的巨幅紗幕，及動態的佛陀影像，提供民眾不一樣的視覺饗宴。\n中央地面圓型升降舞台，共有三層。由外到內分別可升至30、51、102公分高；最內圈舞台以順、逆方向旋轉，藉由旋轉的舞臺，讓四面八方的觀眾都能清楚看見位於中央的表演者。\n大覺堂是國內最具國際水準的專業表演場地，透過文化藝術提昇本國表演藝術水準，並建立國際交流平台。佛館持續安排一系列精采的演出，吸引國內外人士觀賞，並以此拓展國內團體邁向國際之路為目標，讓更多的人透過佛陀紀念館及大覺堂，重新認識新時代的佛教藝術。', '/uploads/videos/attractions/14.mp4', '/uploads/audio/attractions/14.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('86eb3cef-4a29-43b3-9b23-a218fa7b5535', 'b0eb2cba-f92e-476c-9337-a5790c089496', '金佛殿', 'zh_TW', '由佛跳佛奉的金佛，是泰國前僧王所奉的金佛。2004年，泰國十九世僧王贈大壽，製作了19尊金佛，其中一尊贈予星雲大師。象徵著泰、北傳佛教的融合。佛塔體面色。樣型高型。雪留飾大迫紋、象徵光明智慧；半圓狀坐行座塔，環繞佛身，聳立尊嚴，充滿了東南亞特色的情調。\n\n殿內壁面供奉近5000尊釋迦牟尼佛地像，盡為「一佛出世，萬佛護持」，十四根柱外則雕刻金剛經、藥師經、普門品、阿陀經等，供人閱讀。\n\n此外，「心中願藏事，法應可告知」，殿堂設有中、英文「古德法語箱」供人抽取，並有法師親自解答疑惑。所謂法語不斷且以，除了發受法語解決法語的真義，更能將溫馨的甘露帶回家。這也是大眾最喜愛的人機互動之一。下次前往佛陀紀念館，不妨到金佛殿抽張法語，看看佛陀對您心中的煩惱，做出什麼樣的建議。此外，也可以獻燈祈福，所謂「千年暗室，一燈即明」，心中的疑惑，就在一盞虔誠的佛燈中，看見智慧的光明吧！', '/uploads/videos/attractions/11.mp4', '/uploads/audio/attractions/11.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('2d1f86d3-0c68-4191-93d8-8df779616d57', '89617dc5-68fb-4611-a797-e1f936a6370a', '禪畫禪話', 'zh_TW', '星雲大師說：「禪如畫，可以美化環境；禪如鹽，可以促進食慾；禪如花，讓人欣賞；禪如胭脂，讓人亮麗。禪是幽默，是大自然、是我們的心、是我們的本來面目，禪是人間佛教的根本。」\n禪是智慧、是幽默、是慈悲，而且一點也不遙遠，就在我們的週遭。在忙碌、緊張和紛擾的社會，有煩有苦的現代生活，不妨幽默一下、放鬆一點，看看白雲，參一參佛陀留給我們古老遺產──禪。\n佛陀在靈山會上說法，拈了一朵金色波羅花，大眾皆默然，唯獨首座弟子大迦葉破顏微笑，於是佛陀說：「吾有正法眼藏，涅槃妙心，實象無相，微妙法門，不立文字，教外別傳，付囑摩訶迦葉。」禪宗從此流傳。\n〈禪畫禪話〉位在佛陀紀念館菩提廣場兩側外牆，是將畫家高爾泰、蒲小雨伉儷依《星雲禪話》所繪的禪畫作品，延請雕塑家葉先鳴、彩繪家陳啟明共同完成的四十幅浮雕系列，是全台最長的雕塑作品。浮雕的畫面經由光影、色彩、視覺的角度，方能呈現完美的作品，讓觀者領悟禪畫精神的傳遞。', '/uploads/videos/attractions/28.mp4', '/uploads/audio/attractions/28.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('c4fd17ea-4bfa-451e-af36-82cd230363a2', 'c8f289ac-1d5d-4912-a25a-d89120b2a008', '二眾塔｜三好兒童館', 'zh_TW', '「互動」、「科技」與「遊戲」，歡喜學三好。專為兒童設計的「三好兒童館」，是以星雲大師所提倡的三好運動「做好事、說好話、存好心」為中心思想規劃而成。\n以人間衛視優質卡通「我愛歡喜」為故事背景，一走進三好兒童館內，即是一趟驚奇之旅！跟隨著卡通主角小沙彌「歡喜」，在遊戲設施「三好轉盤」、3D電影「三好劇院」和多媒體感應互動「三好學園」，體驗三好運動的內涵，實際行動體會行三好的歡喜。\n第一站「三好轉盤」以問題引領小朋友思考，在遊戲中訓練以眼去看、以心思考、以手行動去找答案，加上佛光老師從旁說明，建立三好觀念。\n第二站「三好劇院」播映我愛歡喜「一起做花燈」，透過小朋友們齊心合力製作出花燈，突破萬難完成元宵花燈的故事，了解團結力量大的真諦。\n最後一站「三好學園」的互動體驗則讓大家透過高科技互動感應，實際體驗三好觀念中「做好事」所獲得的快樂。另也透過集體聲音的能量，協助受傷的小鳥振翅高飛，感受說好話的力量。\n貫穿本館的故事為人間衛視所製作「我愛歡喜」動畫影片，儼然成為佛光山歡樂泉源的代言角色。本片榮獲國內外多項獎項，包含第52屆電視金鐘獎「動畫節目獎」、2017美國金勳章國際影片大賽動畫卓越獎、2017美國景深國際影展最佳動畫短片、2018美國全球獨立電影獎「最佳動畫電影銅獎」、2018印度 AAB國際影展等。因此，佛陀紀念館委其再製作，為三好兒童館添新妝，擴大發揮三好精神，持續帶給大家歡喜。', '/uploads/videos/attractions/21.mp4', '/uploads/audio/attractions/21.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('4def5d4a-277a-4517-be17-7b6b8b6a519a', '6130615d-5fcf-4ccc-aca9-e1210260675f', '本館二樓', 'zh_TW', '星雲大師說：「宗教如藝術，人在生活中離不開美感。」\n芸芸眾生，除了物質需求，精神層面同樣重要，它可以透過音樂、繪畫、雕塑等來淨化心靈。您多久沒沉潛於藝術殿堂中了？享受一下慢活，信步於佛陀紀念館本館二樓各個展覽廳吧！\n本館二樓設有四個展覽廳，分為南北兩側，南為一、二展廳，北為三、四展廳。第一、二展廳中設有可立體透視的中間島型櫃，參觀者能盡興觀覽展品的精髓；第三、四展廳間活動隔板的設計，讓藝術家更可自由移動佈展。四個展廳的開放，成就許多名家與大眾結下善因緣，提升人文藝術之風。\n自二〇一一年開館後，佛陀紀念館與中國文物交流中心簽署十年合作協議。二〇一二年起，陸續展出山東青州龍興寺佛教造像、十六家博物館聯合展出絲綢之路、中國南方佛教藝術展、明清水陸畫、河南鞏義石窟寺拓片等佛教藝術展。在非物質文化遺產相關展覽，有少數民族服裝展、湖南民藝民風民俗特展、河南非物質文化遺產，及山東、福建、廣西文化展。更與台灣國立歷史博物館、金門文化園區歷史民俗博物館、國立科學工藝博物館、國立故宮博物院、大英圖書館及杜倫大學合作策展。\n佛陀紀念館不僅館藏豐富，更突破一般博物館的經營理念，積極與各博物館進行交流合作，大力推動展覽和展品在教育上的意義，著重在公眾服務性的用心。館方也致力落實星雲大師以藝術弘法的理念，透過不同的展覽，讓佛教藝術在無形中發揮潛移默化的功能，提升來館民眾對藝術與生活美學的涵養。', '/uploads/videos/attractions/15.mp4', '/uploads/audio/attractions/15.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('c137bc58-8bf8-4910-a307-9d6d01674377', 'fe3fc8e8-83cb-42b3-9242-adefa1c15138', '佛光大佛', 'zh_TW', '入館第一眼看見的就是一座巍峨的大佛，這是台灣的地標之一「佛光大佛」。佛光山佛陀紀念館的佛光大佛，是亞洲最大的銅鑄坐佛，由星雲大師發起建造，共用一千八百多公噸鋼鐵建造，費時一年半完成。地基加佛身共有一百零八公尺，相當於一般建築的三十六層樓，為亞洲著名地標之一，堪稱驚世之作。\n\n宋朝的茶陵郁和尚寫了一首開悟詩：「我有明珠一顆，久被塵勞關鎖；今朝塵盡光生，照破山河萬朵。」所謂的明珠即是每個人自身的佛性，每個人原本都是一顆閃閃明珠，但累世的習氣就如同塵埃一樣，讓明珠早已蒙塵，但經由修行將宿世累積的惡習、執著放下，明珠自然再度大放光明，人人皆可成佛。\n\n為了讓世人認識自己的如來佛性，星雲大師建造這尊佛光大佛，用建築表達了「我是佛」的理念。當全球各地的參訪者踏進佛陀紀念館，仰頭看見「佛光大佛」崇高偉大、低眉慈眼凝視眾生，星雲大師希望：「每一個人都能感受到佛陀就是自己，即使是信仰天主、基督、媽祖，也能感覺自己有著天主、基督、媽祖的崇高本質。佛館創造這樣的情境，讓人人藉著對佛的崇敬禮拜，而提昇自我、開發自我，以覺性的欣發，來面對每一天的生活。」', '/uploads/videos/attractions/1.mp4', '/uploads/audio/attractions/1.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('786fd898-a954-437c-b882-370a71056c68', 'ae16fe40-f952-4b0b-a1ec-b4c3b7d8e417', '十八羅漢像', 'zh_TW', '十八羅漢矗立在本館前的菩提廣場兩側，由星雲大師監製，造型依藝術家吳榮賜所作的十八羅漢樟木像，再以青斗石刻鑿而成。這十八尊羅漢包括大迦葉、舍利弗、須菩提、迦旃延、周利槃陀伽、賓頭盧、羅睺羅、阿那律、阿難陀、富樓那、迦留陀夷、目犍連、優波離、大愛道比丘尼、妙賢比丘尼、蓮華色比丘尼，及降龍羅漢和伏虎羅漢，與一般常見的十八羅漢組合略有不同。\n此十八羅漢以佛陀十大弟子為主，加入《佛說阿彌陀經》諸羅漢以及中國佛教常見的降龍羅漢和伏虎羅漢，其中最特別的是大愛道、蓮華色、和妙賢三位比丘尼尊者，此乃星雲大師有感於比丘尼對佛教亦諸多貢獻，將其納入十八羅漢之列，彰顯佛教眾生平等的教義，也賦予兩性平等的時代性。\n每尊羅漢線條簡潔流暢，刀法樸拙，造型、神情、衣著、年齡及姿態，無一雷同；比如周利槃陀伽是位掃地開悟的羅漢，手握掃帚，衣紋隨著掃地動作而波動。三位比丘尼尊者，面相柔和又堅毅。每尊羅漢皆依其本身的修行歷程與性格，呈顯體相，展現出證悟尊者之道行與風範。', '/uploads/videos/attractions/32.mp4', '/uploads/audio/attractions/32.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('e74a792d-6f11-4eb9-8434-2922fb27a5db', 'cd50ddb2-938e-4364-98f2-150a643c5035', '雙閣樓', 'zh_TW', '本館北側有一處可讓身心靈休憩的空間名為「雙閣樓人文空間」，雙閣樓外觀彷彿日本的金閣寺。在「清風吹拂老樹，池畔長滿荷花」的生態池襯托下，閃閃金光顯得特別奪目。雙閣樓外，圍繞著榕樹林及生態池，這是校外教學，體驗自然生態，蘊涵生命教育的最佳場所。有人說煦煦陽光映照在雙閣樓是最美的景色；也有人說，夜晚金碧輝煌的雙閣樓是最莊嚴的時刻。\n雙閣樓二樓人文空間傳揚著中華茶道文化，有專人指導如何泡茶。喝茶可以提神醒腦，在佛門中因喝茶能集中思維、止靜斂心，因此茶禪文化自成一格，有道禪師不僅飲茶，且常在品飲之間說禪語、鬥機鋒，體悟「禪道」，例如有名的「趙州吃茶」公案即是。\n趙州禪師，凡有學僧去參訪他，他都是一句話，叫你「吃茶去」、「洗碗去」，或是「掃地去」。如果你問：「禪師！如何是道？」他說：「你去吃茶。」如果你再問：「如何開悟？」他也是叫你「吃茶去」。什麼是道？什麼是悟？一律「吃茶去」。意思是要你不要離開生活，在生活裡悟道。「茶禪一味」即是希望人們在靜坐、泡茶、奉茶品茗間與佛印心。\n雙閣樓也不定期的規畫講座，邀請文化與藝術專家在此注入更多的人文氣息。另還有「小小茶師培訓」課程，及有機會與駐館藝術家暢談他們的創作經歷。\n三樓設有佛館駐館藝術家工作室，以文化、藝術淨化人心，讓大眾共享藝文深度，傾聽、善美與感動。', '/uploads/videos/attractions/33.mp4', '/uploads/audio/attractions/33.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('790137a3-7d56-4173-afc5-0109cc281e8b', '2920a187-6b82-4bfd-b9ae-6de4944d01a7', '護生圖', 'zh_TW', '佛光山佛陀紀念館「護生圖」浮雕設計，出自佛光山開山星雲大師的構想，為佛教藝術之創舉，以宣揚佛教的慈悲護生、不殺生，推廣校外教學、重視生命教育為主軸，共計70幅。內容選自《護生畫集》，弘一大師題詩撰文、豐子愷畫，「以藝術作方便，人道主義為宗趣」，從圖像轉變成立體浮雕，位於八塔長廊外牆，並穿插書卷窗樣式的星雲大師《佛光菜根譚》，由書法名家書寫。希望大家在觀賞「護生圖」同時，能長養自己的慈悲心。\n佛陀紀念館重視校外教學，一群群國、中小學生們，在佛光老師導覽下，佇足聆聽，領受〈護生圖〉說法的涵義。無論是「輕紈（小扇）原在手，未忍撲雙飛」的小女生；或是冬日裡「自掃雪中歸鹿跡，天晴恐有獵人尋」的農戶；還是玩耍小童看到路上為糧食忙碌的螞蟻，趕緊築起長凳之廊，免得「螞蟻搬家」遭踐踏，每幅圖畫都在講述佛法「無緣大慈，同體大悲」的精神。', '/uploads/videos/attractions/16.mp4', '/uploads/audio/attractions/16.mp3');
INSERT INTO public."Attractions_Translations" VALUES ('e9827e48-3802-44b4-bd43-e44b3a5b784f', '2d9c27e1-082d-4832-b623-de04d9340c74', '四給塔', 'zh_TW', '四給塔的「四給」即是「給人信心、給人歡喜、給人希望、給人方便」，這是佛光山的工作信念。目前四給塔作為文化廣場使用，讓大眾都能遨遊於書香天地，從中享受心靈寧靜。星雲大師希望，大家讀書能「讀做一個人，讀明一點理，讀悟一些緣，讀懂一顆心」，讀書的真諦不就是如此？\n星雲大師特別重視兒童教育，四給塔內，特別設有兒童專區，提供親子共讀，一起讀出親情，一起讀出做人的道理。', '/uploads/videos/attractions/23.mp4', '/uploads/audio/attractions/23.mp3');


--
-- Data for Name: Base_Location; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Base_Location" VALUES ('2c649760-3d3f-429b-9d57-0748616ef9e4', '佛光大佛', 'attractions', '0101000020E610000045FC99BF171C5E407471D5E6FFC13640', '2026-08-14 18:34:10.903398');
INSERT INTO public."Base_Location" VALUES ('3aa3731e-34ca-4a0b-aba1-536a301d942e', '大佛平台', 'attractions', '0101000020E61000005A10DA641C1C5E40EA1B72DAFFC13640', '2026-08-14 18:37:56.776376');
INSERT INTO public."Base_Location" VALUES ('c10cbc7e-7881-4bf0-9562-4277f0e85a44', '大佛平台抄經堂', 'attractions', '0101000020E61000004107F9491A1C5E4088CE30B101C23640', '2026-08-14 18:39:16.785705');
INSERT INTO public."Base_Location" VALUES ('709e0d71-57bb-4cd3-ad71-ae6bb64d8ac3', '佛光樓', 'attractions', '0101000020E6100000C2626BB71B1C5E403E5AC387FAC13640', '2026-08-14 18:39:16.785705');
INSERT INTO public."Base_Location" VALUES ('002b9f7d-f1bc-458e-badc-bad7c1822290', '四聖塔/觀音塔', 'attractions', '0101000020E61000004E6B4D41361C5E401FD1DC0FF6C13640', '2026-08-14 19:16:53.82753');
INSERT INTO public."Base_Location" VALUES ('41093876-bdce-4815-9a8f-39e3eaf282b5', '四聖塔/文殊塔', 'attractions', '0101000020E6100000C0D4EC6C291C5E4020986F1F05C23640', '2026-08-14 19:16:53.82753');
INSERT INTO public."Base_Location" VALUES ('ac1f395c-8444-4816-9742-92640b562ab3', '四聖塔/地藏塔', 'attractions', '0101000020E610000085927C0F311C5E40F9DF7329C3C13640', '2026-08-14 19:16:53.82753');
INSERT INTO public."Base_Location" VALUES ('f8a4390f-6edf-4d6c-99ed-ea39d9eb52f9', '四聖塔/普賢塔', 'attractions', '0101000020E61000003C56E255241C5E40C17B9E20D6C13640', '2026-08-14 19:16:53.82753');
INSERT INTO public."Base_Location" VALUES ('8931a4a4-8bbf-44ae-97bc-c4a0f96aa34f', '佛光一滴', 'attractions', '0101000020E610000043799579241C5E4083CE77FEF2C13640', '2026-08-14 19:16:53.82753');
INSERT INTO public."Base_Location" VALUES ('72b87fd4-1762-45fe-aca7-bedc0421d4af', '觀音殿', 'attractions', '0101000020E61000009A0E65752C1C5E4049DC7CD6E7C13640', '2026-08-14 19:16:53.82753');
INSERT INTO public."Base_Location" VALUES ('969c6918-2f66-44fd-8c64-28046011554d', '金佛殿', 'attractions', '0101000020E6100000D222C5482C1C5E40749BE0B1EDC13640', '2026-08-14 19:16:53.82753');
INSERT INTO public."Base_Location" VALUES ('390393fd-d33d-47a2-9bcf-937dd5ffc566', '玉佛殿', 'attractions', '0101000020E61000007E8298E62B1C5E4049021BCCDDC13640', '2026-08-14 19:16:53.82753');
INSERT INTO public."Base_Location" VALUES ('bf41a0f3-efe0-4b32-91c2-71baf91a099f', '本館一樓', 'attractions', '0101000020E6100000424FBE392D1C5E40892A9812E4C13640', '2026-08-14 19:16:53.82753');
INSERT INTO public."Base_Location" VALUES ('c9baaf29-cd2b-4663-b14c-8f2102212c28', '大覺堂', 'attractions', '0101000020E6100000DE1E76872F1C5E400CAF28E6EAC13640', '2026-08-23 21:37:48.336593');
INSERT INTO public."Base_Location" VALUES ('c27e537e-e3b3-4913-9eaa-b17d5dffe19e', '本館二樓', 'attractions', '0101000020E61000005513BCCF2E1C5E4004795B94DFC13640', '2026-08-23 21:38:44.685109');
INSERT INTO public."Base_Location" VALUES ('26081311-cc36-46ab-ba2a-adf04048e6eb', '護生圖', 'attractions', '0101000020E6100000A4EF29F2731C5E405FFC7D36ADC13640', '2026-08-23 21:38:44.685109');
INSERT INTO public."Base_Location" VALUES ('6e823a11-68a1-4357-aae6-298a1f24324b', '小品店', 'attractions', '0101000020E61000000C8D99BA911C5E400899EA1D1DC13640', '2026-08-23 21:40:11.248721');
INSERT INTO public."Base_Location" VALUES ('de39203b-bdd7-493d-ad87-8b9ae20f2ea6', '祇園', 'attractions', '0101000020E61000008E5823224C1C5E40E41C31D2F4C13640', '2026-08-23 21:40:11.248721');
INSERT INTO public."Base_Location" VALUES ('a999b13b-4528-406a-a3de-6e85b3e3189e', '萬人照相台', 'attractions', '0101000020E61000009ACBF31A4E1C5E40A3B3C21EB7C13640', '2026-08-23 21:40:11.248721');
INSERT INTO public."Base_Location" VALUES ('24d38e3e-94fb-4635-849e-ce23fc655d50', '一教塔', 'attractions', '0101000020E6100000C3CEA7F94F1C5E40C0378EEA9EC13640', '2026-08-23 21:41:57.917063');
INSERT INTO public."Base_Location" VALUES ('a8c29ae2-1a56-43bd-af7a-c208a083fe31', '二眾塔｜三好兒童館', 'attractions', '0101000020E6100000426AE0D9531C5E40B8EFAF6AC5C13640', '2026-08-23 21:41:57.917063');
INSERT INTO public."Base_Location" VALUES ('5f886f0a-73f8-44ab-b502-080d3f98efb0', '三好塔', 'attractions', '0101000020E6100000026B33B5591C5E40F3BE4AB891C13640', '2026-08-23 21:41:57.917063');
INSERT INTO public."Base_Location" VALUES ('fd4e43f0-0a03-433c-9bcc-60dd73d8f511', '四給塔', 'attractions', '0101000020E61000004F558F475D1C5E40D14F30FAB7C13640', '2026-08-23 21:41:57.917063');
INSERT INTO public."Base_Location" VALUES ('24062b8b-c4da-48ab-859d-470db30490f3', '五和塔', 'attractions', '0101000020E6100000DC438564631C5E401E24D40984C13640', '2026-08-23 21:41:57.917063');
INSERT INTO public."Base_Location" VALUES ('1aba9f2b-df38-4b8a-b5bb-a629dc412b3d', '六度塔', 'attractions', '0101000020E61000007FD4D622671C5E409453E10AAAC13640', '2026-08-23 21:41:57.917063');
INSERT INTO public."Base_Location" VALUES ('7a5ad028-4f13-4781-bddf-6f3bd4af5783', '七誡塔', 'attractions', '0101000020E6100000C34581CD6C1C5E408CEF82FD76C13640', '2026-08-23 21:43:20.525272');
INSERT INTO public."Base_Location" VALUES ('c2344671-2cd9-474c-bbf0-33b12671a2f0', '八道塔', 'attractions', '0101000020E6100000BE7CC8B7701C5E40301BDE5F9DC13640', '2026-08-23 21:43:20.525272');
INSERT INTO public."Base_Location" VALUES ('db1177ff-8748-425d-959d-d19fbaed57d1', '禪畫禪話', 'attractions', '0101000020E6100000F9789451351C5E40D8C0DA00B5C13640', '2026-08-23 21:43:20.525272');
INSERT INTO public."Base_Location" VALUES ('b8b36cd1-9b41-4a58-85a0-0dc1085b62fe', '古德偈語與佛陀行化本事', 'attractions', '0101000020E610000074853E993B1C5E40532C8AC1F6C13640', '2026-08-23 21:43:20.525272');
INSERT INTO public."Base_Location" VALUES ('5fda1ee5-8ece-4c09-9584-3f52a3e4a6b1', '菩提廣場', 'attractions', '0101000020E6100000585C6ABF411C5E40012812DDD2C13640', '2026-08-23 21:44:55.882064');
INSERT INTO public."Base_Location" VALUES ('53cb3a9f-f35a-4521-9103-4b6fc255770f', '八宗祖師像', 'attractions', '0101000020E610000091DB1D4F391C5E406E040710E9C13640', '2026-08-23 21:44:55.882064');
INSERT INTO public."Base_Location" VALUES ('93ef2387-f2b8-4b5e-a04f-1a5a8ff92007', '十八羅漢像', 'attractions', '0101000020E6100000A5F03ADC3B1C5E4099903652B8C13640', '2026-08-23 21:44:55.882064');
INSERT INTO public."Base_Location" VALUES ('44b8f1d9-8769-4118-9626-51d67831f8d7', '雙閣樓', 'attractions', '0101000020E6100000CB9E5C785C1C5E4034F909AC08C23640', '2026-08-23 21:44:55.882064');
INSERT INTO public."Base_Location" VALUES ('d4acc003-d75c-4326-baf1-1509c2efc7e4', '雙閣樓 滴水坊', 'attractions', '0101000020E6100000B43C061B5E1C5E406894463504C23640', '2026-08-23 21:44:55.882064');
INSERT INTO public."Base_Location" VALUES ('12ebac70-169f-4ac1-b5a9-07a679bbc5b0', '樟樹林 滴水坊', 'attractions', '0101000020E6100000C70A5EFC441C5E40BB84C9C605C23640', '2026-08-23 21:47:37.95721');
INSERT INTO public."Base_Location" VALUES ('8b36f6f4-7273-49e6-8742-1cb39d496ff5', '禮敬大廳', 'attractions', '0101000020E610000042E2B471821C5E409B642A1E7CC13640', '2026-08-23 21:47:37.95721');
INSERT INTO public."Base_Location" VALUES ('ab2d5ed0-ec16-4af3-af58-9ddd332128e4', '禮敬大廳 滴水坊', 'attractions', '0101000020E6100000869FF017851C5E403C1F3A2B7EC13640', '2026-08-23 21:47:37.95721');
INSERT INTO public."Base_Location" VALUES ('d34ca4f5-6992-4b38-acb5-935aaf7e9e03', '禮敬大廳二樓 百味軒自助餐', 'attractions', '0101000020E6100000A07B8B21831C5E405E63FC6E6CC13640', '2026-08-23 21:47:37.95721');
INSERT INTO public."Base_Location" VALUES ('735ce189-c11b-43b5-a3fa-3e4c4a2c7e53', '禮敬大廳二樓 禪悅齋 合菜圓桌', 'attractions', '0101000020E6100000F1A694CC841C5E407B8FA70471C13640', '2026-08-23 21:47:37.95721');
INSERT INTO public."Base_Location" VALUES ('0385ad02-8000-4db6-abcf-4322860e95d8', '千家寺院百萬人士功德芳名碑牆', 'attractions', '0101000020E610000054CD0035711C5E40BF73ABB56BC13640', '2026-08-23 21:47:37.95721');
INSERT INTO public."Base_Location" VALUES ('13f73bab-def3-442e-a82e-77c74df7503b', '犀牛區', 'attractions', '0101000020E61000000B028266571C5E40369A1839DAC13640', '2026-08-23 21:47:37.95721');


--
-- Data for Name: Collection; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Collection_Themes; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Collection_Themes_Translations; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Collection_Translations; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Employee; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Event_Translations; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Exhibit; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Exhibit_Translations; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Exhibition; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Exhibition_Translations; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Itinerary_Group; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Itinerary_Group" VALUES ('cb341cee-5ff3-4eb6-b113-faa7a9408e95', '1b899729-5a12-4e22-b247-7c9aa5815f9e', 5, '2026-09-02', '測試行程', false, false, 'apply', '2026-09-01 20:49:54.056032+00');
INSERT INTO public."Itinerary_Group" VALUES ('60bfb4dc-4ebf-4238-b02a-9e31907a92cd', '1b899729-5a12-4e22-b247-7c9aa5815f9e', 5, '2026-09-02', '測試行程2', false, false, 'apply', '2026-09-01 21:06:23.940494+00');
INSERT INTO public."Itinerary_Group" VALUES ('513b8087-604f-47cd-a8b9-f6b300bbaf7a', '1b899729-5a12-4e22-b247-7c9aa5815f9e', 1, '2026-09-02', '攝手之旅_賴廷宇', false, false, 'apply', '2026-09-01 21:08:58.652696+00');
INSERT INTO public."Itinerary_Group" VALUES ('9bbeb94c-5f99-4fa3-abec-4323813d40e1', '1b899729-5a12-4e22-b247-7c9aa5815f9e', 5, '2026-09-02', '浪漫之旅_劉冠廷', false, false, 'apply', '2026-09-01 21:28:46.610402+00');


--
-- Data for Name: Itinerary_Item; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Itinerary_Item" VALUES ('1f33cbda-c5c7-42ad-949f-e46a8774b7db', 'cb341cee-5ff3-4eb6-b113-faa7a9408e95', 'attractions', '63a01ed5-2b70-45c7-811f-377f6290659b', NULL, NULL, false, 1);
INSERT INTO public."Itinerary_Item" VALUES ('6fcba126-7b72-4b75-9181-de72db9f1d7a', '60bfb4dc-4ebf-4238-b02a-9e31907a92cd', 'attractions', '63a01ed5-2b70-45c7-811f-377f6290659b', '10:00:00', '10:30:00', false, 1);
INSERT INTO public."Itinerary_Item" VALUES ('6b704e54-cba6-40dc-b233-5e9aa304bff7', '60bfb4dc-4ebf-4238-b02a-9e31907a92cd', 'attractions', '9da51fd6-f5bf-4c2b-a8c9-ca5de5d687b7', '10:31:00', '11:16:00', true, 2);
INSERT INTO public."Itinerary_Item" VALUES ('fec5cf67-4cb9-4a38-9775-2a405f534928', '513b8087-604f-47cd-a8b9-f6b300bbaf7a', 'attractions', 'e70e5af4-0c13-4cae-bc04-1f0a787ed5a7', '10:00:00', '10:30:00', false, 1);
INSERT INTO public."Itinerary_Item" VALUES ('dce988cc-90e8-491b-b789-82d275bc1389', '513b8087-604f-47cd-a8b9-f6b300bbaf7a', 'attractions', 'e38f1743-e90e-49be-9ca4-851f3c45b0b4', '10:30:00', '11:30:00', false, 2);
INSERT INTO public."Itinerary_Item" VALUES ('5d949e89-bf40-46be-8c1e-6e81e2cd9796', '513b8087-604f-47cd-a8b9-f6b300bbaf7a', 'attractions', 'd21c48f4-56ff-410c-883c-df6c332e3b69', '11:31:00', '13:31:00', false, 3);
INSERT INTO public."Itinerary_Item" VALUES ('b2ae601b-b331-432a-8565-38b552d42d86', '513b8087-604f-47cd-a8b9-f6b300bbaf7a', 'attractions', 'a993228f-976e-4018-949d-d83160b9bbfe', '13:32:00', '15:32:00', false, 4);
INSERT INTO public."Itinerary_Item" VALUES ('f0147f18-9c34-4697-b202-9ea508394e28', '9bbeb94c-5f99-4fa3-abec-4323813d40e1', 'attractions', '6b817a09-b8f0-42af-880f-28a08582c18d', '12:00:00', '13:30:00', false, 1);
INSERT INTO public."Itinerary_Item" VALUES ('c02b3236-275e-4d8f-8928-26dba9c50a34', '9bbeb94c-5f99-4fa3-abec-4323813d40e1', 'attractions', 'e38f1743-e90e-49be-9ca4-851f3c45b0b4', '13:30:00', '15:30:00', false, 2);
INSERT INTO public."Itinerary_Item" VALUES ('ae899ec1-96f2-4965-9d71-bbc07a83aedd', '9bbeb94c-5f99-4fa3-abec-4323813d40e1', 'attractions', 'e70e5af4-0c13-4cae-bc04-1f0a787ed5a7', '15:30:00', '16:30:00', false, 3);
INSERT INTO public."Itinerary_Item" VALUES ('cff2fcc3-b86e-47be-80b1-4f259e929b6e', '9bbeb94c-5f99-4fa3-abec-4323813d40e1', 'attractions', '9da51fd6-f5bf-4c2b-a8c9-ca5de5d687b7', '16:34:00', '18:34:00', false, 4);
INSERT INTO public."Itinerary_Item" VALUES ('fd591868-104f-4218-b5ba-e9fdfa0793a5', '9bbeb94c-5f99-4fa3-abec-4323813d40e1', 'attractions', 'fe3fc8e8-83cb-42b3-9242-adefa1c15138', '18:34:00', '19:04:00', false, 5);


--
-- Data for Name: Itinerary_Item_Review; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Opening_Exceptions; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Opening_Schedules; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Park_Network; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Park_Network" VALUES (73, '普賢塔', 58, 82, 0, 0, 0, true, '0102000020E610000002000000D6B7778A241C5E4010AA664ED8C13640E74EEB56241C5E40D2077F23D6C13640');
INSERT INTO public."Park_Network" VALUES (74, '本館內部', 56, 83, 0, 0, 0, true, '0102000020E6100000020000009B76AFAA281C5E4076B5DA0AEDC13640D08681492C1C5E40463DD5ADEDC13640');
INSERT INTO public."Park_Network" VALUES (75, '本館內部', 83, 84, 0, 0, 0, true, '0102000020E610000002000000D08681492C1C5E4005A2B6B1EDC136402A1B96732C1C5E4013639FDFE7C13640');
INSERT INTO public."Park_Network" VALUES (76, '本館內部', 84, 85, 0, 0, 0, true, '0102000020E610000002000000325DCB772C1C5E40C33B94C0E7C13640FDF69DE62B1C5E40F1B07BBFDDC13640');
INSERT INTO public."Park_Network" VALUES (77, '本館內部', 56, 85, 0, 0, 0, true, '0102000020E6100000020000001926A2A9281C5E40B350F906EDC136400539D3EA2B1C5E40597B3EC7DDC13640');
INSERT INTO public."Park_Network" VALUES (78, '本館內部', 83, 49, 0, 0, 0, true, '0102000020E610000002000000D08681492C1C5E4004A2B6B1EDC13640382DCAE32D1C5E40801F637BEDC13640');
INSERT INTO public."Park_Network" VALUES (79, '本館內部', 49, 86, 0, 0, 0, true, '0102000020E6100000020000003CCEE4E52D1C5E4003E92583EDC13640B5577D862F1C5E407567F3DFEAC13640');
INSERT INTO public."Park_Network" VALUES (80, '本館內部', 86, 87, 0, 0, 0, true, '0102000020E610000002000000BC99B28A2F1C5E407567F3DFEAC13640309F70CF2E1C5E40F41D2391DFC13640');
INSERT INTO public."Park_Network" VALUES (81, '本館內部', 88, 80, 0, 0, 0, true, '0102000020E610000002000000562C853C2D1C5E4031D01B02E4C136408F7FF1DF2C1C5E402C71FF9CE1C13640');
INSERT INTO public."Park_Network" VALUES (82, '本館內部', 85, 87, 0, 0, 0, true, '0102000020E6100000020000008F2AFBED2B1C5E40BB3F68E2DDC13640A9AD48CC2E1C5E401A830495DFC13640');
INSERT INTO public."Park_Network" VALUES (83, '本館內部', 88, 87, 0, 0, 0, true, '0102000020E6100000020000005ACD9F3E2D1C5E403E9ADE09E4C13640B1EF7DD02E1C5E401A830495DFC13640');
INSERT INTO public."Park_Network" VALUES (84, '本館內部', 88, 86, 0, 0, 0, true, '0102000020E610000002000000562C853C2D1C5E4033D01B02E4C1364027C53A812F1C5E40A30212DCEAC13640');
INSERT INTO public."Park_Network" VALUES (85, '本館內部', 88, 84, 0, 0, 0, true, '0102000020E610000002000000562C853C2D1C5E403E9ADE09E4C13640A7CA88722C1C5E40FCC780E3E7C13640');
INSERT INTO public."Park_Network" VALUES (86, '本館內部', 87, 83, 0, 0, 0, true, '0102000020E610000002000000C0D2CDD62E1C5E40FDE14CACDFC136405978A94C2C1C5E40C6E08C96EDC13640');
INSERT INTO public."Park_Network" VALUES (87, '本館內部', 89, 49, 0, 0, 0, true, '0102000020E6100000020000007B0E48C52D1C5E4038A26F9DE5C13640BBDCBCE22D1C5E40BA27FC67EDC13640');
INSERT INTO public."Park_Network" VALUES (88, '觀音塔', 45, 20, 0, 0, 0, true, '0102000020E61000000200000015CEEC09361C5E40672A0880F4C13640B64C99CD361C5E403A94AF80FAC13640');
INSERT INTO public."Park_Network" VALUES (89, '本館內部', 48, 19, 0, 0, 0, true, '0102000020E6100000020000007A9C112D2F1C5E40E1BA08DEFCC13640D43026572F1C5E4031520EA0FDC13640');
INSERT INTO public."Park_Network" VALUES (90, '廣場外圍', 28, 90, 0, 0, 0, true, '0102000020E610000002000000040756473A1C5E40A6DD50C6F8C13640CB08E0953B1C5E40C6B5D0AEF6C13640');
INSERT INTO public."Park_Network" VALUES (91, '廣場外圍', 90, 91, 0, 0, 0, true, '0102000020E610000002000000D74A159A3B1C5E40BC4756BEF6C1364072EE260F411C5E4091C876BDEEC13640');
INSERT INTO public."Park_Network" VALUES (92, '廣場外圍', 91, 92, 0, 0, 0, true, '0102000020E610000002000000636ABC06411C5E40CCA26B9EEEC13640055B9F62401C5E40F70CF0B4E7C13640');
INSERT INTO public."Park_Network" VALUES (93, '廣場外圍', 29, 93, 0, 0, 0, true, '0102000020E610000002000000626297FB391C5E4031716C97F5C13640C26618BD401C5E407AB3179EEBC13640');
INSERT INTO public."Park_Network" VALUES (94, '廣場外圍', 93, 94, 0, 0, 0, true, '0102000020E610000002000000BEC5FDBA401C5E407AB3179EEBC13640B319B729491C5E408376D2BBDFC13640');
INSERT INTO public."Park_Network" VALUES (95, '廣場外圍', 91, 95, 0, 0, 0, true, '0102000020E610000002000000670BD708411C5E4091C876BDEEC13640D2779F56471C5E401F6C32A5E5C13640');
INSERT INTO public."Park_Network" VALUES (96, '廣場外圍', 95, 96, 0, 0, 0, true, '0102000020E610000002000000D618BA58471C5E402BA26F9DE5C13640AAB16F9D491C5E401E652C7EE3C13640');
INSERT INTO public."Park_Network" VALUES (97, '廣場外圍', 97, 96, 0, 0, 0, true, '0102000020E610000002000000DF179D2E4A1C5E40E8557B86E8C13640B0528A9F491C5E40F4D0A66EE3C13640');
INSERT INTO public."Park_Network" VALUES (98, '廣場外圍', 96, 94, 0, 0, 0, true, '0102000020E610000002000000B0528A9F491C5E40099B6976E3C13640B7BAD12B491C5E40574DC79CDFC13640');
INSERT INTO public."Park_Network" VALUES (99, '廣場外圍', 97, 98, 0, 0, 0, true, '0102000020E610000002000000D8D5672A4A1C5E40E8557B86E8C13640015AF28B451C5E40A15766A6F0C13640');
INSERT INTO public."Park_Network" VALUES (100, '廣場外圍', 98, 99, 0, 0, 0, true, '0102000020E61000000200000005FB0C8E451C5E40A15766A6F0C13640955EB3FF421C5E4079CE66D5F4C13640');
INSERT INTO public."Park_Network" VALUES (101, '廣場外圍', 99, 100, 0, 0, 0, true, '0102000020E6100000020000009EA0E803431C5E40493CE1C5F4C136400FF2CA58411C5E40CE92E1F4F8C13640');
INSERT INTO public."Park_Network" VALUES (102, '廣場外圍', 100, 101, 0, 0, 0, true, '0102000020E6100000020000001393E55A411C5E40CC92E1F4F8C1364045A41CFA401C5E406A9D2F33FBC13640');
INSERT INTO public."Park_Network" VALUES (103, '廣場外圍', 101, 102, 0, 0, 0, true, '0102000020E61000000200000054876C00411C5E406A9D2F33FBC13640126401F13F1C5E40AB022A71FAC13640');
INSERT INTO public."Park_Network" VALUES (104, '廣場外圍', 102, 103, 0, 0, 0, true, '0102000020E610000002000000126401F13F1C5E40AB022A71FAC136405AC0CF223F1C5E40C6EC0DA7F6C13640');
INSERT INTO public."Park_Network" VALUES (105, '廣場外圍', 103, 104, 0, 0, 0, true, '0102000020E6100000020000005AC0CF223F1C5E40CB234B9FF6C13640838FD1BD3E1C5E40234C2913F2C13640');
INSERT INTO public."Park_Network" VALUES (106, '廣場外圍', 101, 105, 0, 0, 0, true, '0102000020E610000002000000494537FC401C5E40B2D46C2BFBC136408FBD98FD421C5E40D6EC93A804C23640');
INSERT INTO public."Park_Network" VALUES (107, '滴水坊', 105, 106, 0, 0, 0, true, '0102000020E6100000020000008B1C7EFB421C5E40735C0E9904C23640D435FAFE441C5E409812F8BF05C23640');
INSERT INTO public."Park_Network" VALUES (108, '滴水坊', 106, 107, 0, 0, 0, true, '0102000020E610000002000000D435FAFE441C5E40774A35B805C23640748E943A461C5E40FF1A7879FFC13640');
INSERT INTO public."Park_Network" VALUES (109, '滴水坊', 107, 108, 0, 0, 0, true, '0102000020E610000002000000610A2A32461C5E40FF1A7879FFC13640042944214C1C5E4030731EBEF4C13640');
INSERT INTO public."Park_Network" VALUES (110, '路', 108, 109, 0, 0, 0, true, '0102000020E610000002000000283119324C1C5E405F05A4CDF4C13640944998644C1C5E40C98E56EDFAC13640');
INSERT INTO public."Park_Network" VALUES (111, '廣場', 110, 111, 0, 0, 0, true, '0102000020E610000002000000F76F2A51391C5E404FF2A702E9C136408ADCA2A4381C5E401ADCEABCE9C13640');
INSERT INTO public."Park_Network" VALUES (112, '廣場', 112, 113, 0, 0, 0, true, '0102000020E61000000200000077EFD3E53B1C5E4015EE1B43B8C13640F6D7E1303B1C5E40A9F8753AB0C13640');
INSERT INTO public."Park_Network" VALUES (113, '廣場', 35, 113, 0, 0, 0, true, '0102000020E610000002000000817508EF331C5E4080A3226ABAC13640F6D7E1303B1C5E40B1C46A1BB0C13640');
INSERT INTO public."Park_Network" VALUES (114, '環館道路', 113, 7, 0, 0, 0, true, '0102000020E610000002000000F6D7E1303B1C5E40A492FB49B0C13640269422DE391C5E4051FAD6BCA2C13640');
INSERT INTO public."Park_Network" VALUES (115, '廣場', 114, 38, 0, 0, 0, true, '0102000020E610000002000000ECC3E3BF411C5E4016D132E1D2C136406388A983391C5E402B4A3346D4C13640');
INSERT INTO public."Park_Network" VALUES (116, '廣場', 114, 112, 0, 0, 0, true, '0102000020E610000002000000ECC3E3BF411C5E4000A527C2D2C1364077EFD3E53B1C5E40F2BB1024B8C13640');
INSERT INTO public."Park_Network" VALUES (117, '廣場', 92, 115, 0, 0, 0, true, '0102000020E610000004000000FC186A5E401C5E401CFEBDDBE7C13640BF9619513F1C5E40C3DBAF2FDBC1364011CCB8D0411C5E4004A527C2D2C13640B39F5B86431C5E406925C9FAE7C13640');
INSERT INTO public."Park_Network" VALUES (118, '廣場', 116, 110, 0, 0, 0, true, '0102000020E610000002000000F99D61E43F1C5E40B08CD8E2E1C136401436CA5D391C5E408B28E5FAE8C13640');
INSERT INTO public."Park_Network" VALUES (3, '環管道路', 1, 2, 14.159378097841934, 14.159378097841934, 14.159378097841934, true, '0102000020E610000002000000EBDFBEDE131C5E40C5DD7A7C18C2364028E0E9A3111C5E401E11FB2517C23640');
INSERT INTO public."Park_Network" VALUES (2, '環管道路', 2, 3, 80.4708442048267, 80.4708442048267, 80.4708442048267, true, '0102000020E610000002000000F7347BA7111C5E40E9BDB51717C23640C26BBE000E1C5E400C96EC6FE9C13640');
INSERT INTO public."Park_Network" VALUES (4, '環管道路', 3, 4, 123.28887955871167, 123.28887955871167, 123.28887955871167, true, '0102000020E61000000200000058C1F5FE0D1C5E40DFF2F93DE9C13640011197EE1F1C5E40B46F8E4ECBC13640');
INSERT INTO public."Park_Network" VALUES (5, '環管道路', 4, 5, 36.42693629379611, 36.42693629379611, 36.42693629379611, true, '0102000020E6100000020000009ABAB9F51F1C5E40B66F8E4ECBC136405F12B81E221C5E40591AC651DFC13640');
INSERT INTO public."Park_Network" VALUES (6, '環管道路', 4, 6, 108.08072810821425, 108.08072810821425, 108.08072810821425, true, '0102000020E610000002000000CE6528F21F1C5E40B56F8E4ECBC13640236C77582F1C5E40A0BFD28AAEC13640');
INSERT INTO public."Park_Network" VALUES (7, '環管道路', 6, 7, 68.88778807686967, 68.88778807686967, 68.88778807686967, true, '0102000020E610000002000000F0C0085C2F1C5E40A0BFD28AAEC13640CDD7A5E1391C5E40B32DAFC7A2C13640');
INSERT INTO public."Park_Network" VALUES (8, '環管道路', 8, 1, 14.606180003454297, 14.606180003454297, 14.606180003454297, true, '0102000020E610000002000000C4237339161C5E4047C269A218C236408A0A01E5131C5E40D19D6F8518C23640');
INSERT INTO public."Park_Network" VALUES (9, '環管道路', 9, 8, 34.964090164686034, 34.964090164686034, 34.964090164686034, true, '0102000020E6100000020000001BC37FC01B1C5E40A257BC6315C236402C7F473E161C5E4048C269A218C23640');
INSERT INTO public."Park_Network" VALUES (10, '環管道路', 10, 9, 43.05138385198012, 43.05138385198012, 43.05138385198012, true, '0102000020E610000002000000FA4E208B221C5E40AD2F58F918C23640689515BE1B1C5E40750E656D15C23640');
INSERT INTO public."Park_Network" VALUES (11, '環管道路', 11, 10, 34.40045620093109, 34.40045620093109, 34.40045620093109, true, '0102000020E610000002000000EB894BE4271C5E4009BD4A2E1EC23640CB05C994221C5E40519DA90C19C23640');
INSERT INTO public."Park_Network" VALUES (12, '環管道路', 12, 11, 19.397005616982526, 19.397005616982526, 19.397005616982526, true, '0102000020E610000002000000B1742A012B1C5E40EE2AFFFD1DC2364054E51FE9271C5E400ABD4A2E1EC23640');
INSERT INTO public."Park_Network" VALUES (13, '環管道路', 12, 13, 13.851948418068192, 13.851948418068192, 13.851948418068192, true, '0102000020E61000000200000064A294032B1C5E401B7456F41DC236403F3509692A1C5E406B32991116C23640');
INSERT INTO public."Park_Network" VALUES (14, '環管道路', 13, 14, 28.118558315314104, 28.118558315314104, 28.118558315314104, true, '0102000020E6100000020000003F3509692A1C5E4010A0EA2416C236401BC2147A261C5E40E93933250EC23640');
INSERT INTO public."Park_Network" VALUES (15, '環管道路', 14, 15, 25.122841731774198, 25.122841731774198, 25.122841731774198, true, '0102000020E6100000020000006794AA77261C5E4016838A1B0EC23640C41ED82C251C5E40AD22B80800C23640');
INSERT INTO public."Park_Network" VALUES (16, '環管道路', 16, 13, 7.57659911313961, 7.57659911313961, 7.57659911313961, true, '0102000020E610000002000000FA46C0FE2A1C5E40FBEC0E2512C236403F3509692A1C5E406A32991116C23640');
INSERT INTO public."Park_Network" VALUES (17, '環管道路', 17, 18, 44.315548279958456, 44.315548279958456, 44.315548279958456, true, '0102000020E610000002000000C716994B371C5E40E4464F6900C2364060AFF29D301C5E402F1A920309C23640');
INSERT INTO public."Park_Network" VALUES (18, '環管道路', 18, 16, 38.043429526327, 38.043429526327, 38.043429526327, true, '0102000020E610000002000000259D758F301C5E40D487E31609C23640FA46C0FE2A1C5E40567FBD1112C23640');
INSERT INTO public."Park_Network" VALUES (19, '環管道路', 18, 19, 20.77613648277307, 20.77613648277307, 20.77613648277307, true, '0102000020E6100000020000008DF84994301C5E40E73EEFDC08C2364071678A552F1C5E40D292E777FDC13640');
INSERT INTO public."Park_Network" VALUES (20, '環管道路', 17, 20, 10.20025835273422, 10.20025835273422, 10.20025835273422, true, '0102000020E6100000020000006B84EA5E371C5E40F7FD5A2F00C2364018CE07CE361C5E40BFDE7F86FAC13640');
INSERT INTO public."Park_Network" VALUES (21, '環管道路', 21, 12, 16.299462558197114, 16.299462558197114, 16.299462558197114, true, '0102000020E610000002000000A78D39992D1C5E4049BE39DC1CC2364062A294032B1C5E404ABDADEA1DC23640');
INSERT INTO public."Park_Network" VALUES (22, '環管道路', 22, 21, 59.256360073387675, 59.256360073387675, 59.256360073387675, true, '0102000020E610000002000000A2A90DB1361C5E40FCEB823313C23640A88D39992D1C5E40A350E8C81CC23640');
INSERT INTO public."Park_Network" VALUES (23, '環管道路', 23, 22, 12.954577146825923, 12.954577146825923, 12.954577146825923, true, '0102000020E610000002000000A2A7F5CD381C5E4045C6996814C2364046175FC4361C5E40577E312013C23640');
INSERT INTO public."Park_Network" VALUES (24, '環管道路', 23, 24, 14.948871847677351, 14.948871847677351, 14.948871847677351, true, '0102000020E610000002000000A2A7F5CD381C5E40A158485514C23640EB8298F4381C5E40673C11810BC23640');
INSERT INTO public."Park_Network" VALUES (25, '環管道路', 24, 25, 8.119835006301843, 8.119835006301843, 8.119835006301843, true, '0102000020E6100000020000008227C4EF381C5E40673C11810BC23640679578BF381C5E40E64007C006C23640');
INSERT INTO public."Park_Network" VALUES (26, '環管道路', 25, 17, 13.808578036288058, 13.808578036288058, 13.808578036288058, true, '0102000020E610000002000000D0F04CC4381C5E40E64007C006C236400229165A371C5E4089B4A07C00C23640');
INSERT INTO public."Park_Network" VALUES (27, '環管道路', 25, 26, 14.791605424561284, 14.791605424561284, 14.791605424561284, true, '0102000020E610000002000000831EB7C6381C5E40CAAEBB8F06C236408A02045A391C5E40F6FF7212FEC13640');
INSERT INTO public."Park_Network" VALUES (28, '環管道路', 27, 26, 5.331646493942443, 5.331646493942443, 5.331646493942443, true, '0102000020E610000002000000DFAFD9C1391C5E402C27AE47FBC136403E306E5C391C5E40F6FF7212FEC13640');
INSERT INTO public."Park_Network" VALUES (29, '環管道路', 27, 28, 5.320140777086006, 5.320140777086006, 5.320140777086006, true, '0102000020E6100000020000002A826FBF391C5E402C27AE47FBC13640C80AE84D3A1C5E406B2929E7F8C13640');
INSERT INTO public."Park_Network" VALUES (30, '環管道路', 28, 29, 5.266524352928331, 5.266524352928331, 5.266524352928331, true, '0102000020E61000000200000042439E3B3A1C5E40AA20CE7CF8C136402B5681F7391C5E400681FE87F5C13640');
INSERT INTO public."Park_Network" VALUES (31, '環管道路', 29, 30, 39.67002213776867, 39.67002213776867, 39.67002213776867, true, '0102000020E6100000020000002B5681F7391C5E40BB3F44A6F5C1364008215A83371C5E409EEC6802E0C13640');
INSERT INTO public."Park_Network" VALUES (32, '本館道路', 31, 32, 9.905773394611975, 9.905773394611975, 9.905773394611975, true, '0102000020E610000002000000A6F2825D371C5E409079AFD3DEC136402688DADC361C5E406776E144D9C13640');
INSERT INTO public."Park_Network" VALUES (33, '本館道路', 33, 34, 10.285445324311672, 10.285445324311672, 10.285445324311672, true, '0102000020E6100000020000001F3926C6361C5E4059032816D8C136409FCE7D45361C5E40C782CE4AD2C13640');
INSERT INTO public."Park_Network" VALUES (34, '本館道路', 34, 35, 42.05861431247568, 42.05861431247568, 42.05861431247568, true, '0102000020E61000000200000045EF5A36361C5E40A946FDEFD1C1364030589CEF331C5E40F8C60B86BAC13640');
INSERT INTO public."Park_Network" VALUES (35, '本館道路', 36, 37, 25.656841216838387, 25.656841216838387, 25.656841216838387, true, '0102000020E6100000020000002909E8D8331C5E40700DAFEEB9C13640FD595D4F321C5E407B6743DCABC13640');
INSERT INTO public."Park_Network" VALUES (36, '本館道路', 33, 38, 19.17291110563123, 19.17291110563123, 19.17291110563123, true, '0102000020E6100000020000001E3926C6361C5E40E0BC84ADD8C1364060AA1E95391C5E40116E2A2FD4C13640');
INSERT INTO public."Park_Network" VALUES (37, '本館道路', 33, 39, 20.765000285923975, 20.765000285923975, 20.765000285923975, true, '0102000020E61000000200000071C994BE361C5E402BFE3E8FD8C1364021BA33C2331C5E40EB8381E1DDC13640');
INSERT INTO public."Park_Network" VALUES (38, '本館道路', 40, 41, 34.24772295564269, 34.24772295564269, 34.24772295564269, true, '0102000020E6100000020000006CFBEDA3331C5E40BE7E985ADEC13640181521AE351C5E40EBF0E927F1C13640');
INSERT INTO public."Park_Network" VALUES (39, '本館道路', 42, 43, 39.68242467918713, 39.68242467918713, 39.68242467918713, true, '0102000020E610000002000000BF8B5C9C331C5E40CD47B086DDC1364013722992311C5E402A3B784BC7C13640');
INSERT INTO public."Park_Network" VALUES (40, '本館道路', 40, 44, 8.096679260159824, 8.096679260159824, 8.096679260159824, true, '0102000020E610000002000000BF8B5C9C331C5E4009C0523CDEC1364004A91166321C5E40EA2D23E4DFC13640');
INSERT INTO public."Park_Network" VALUES (41, '本館道路', 41, 45, 5.807063772521552, 5.807063772521552, 5.807063772521552, true, '0102000020E610000002000000BD35FE9E351C5E40092DBB82F1C136403551F208361C5E40618BD095F4C13640');
INSERT INTO public."Park_Network" VALUES (72, '本館道路', 80, 81, 27.399708646382255, 27.399708646382255, 27.399708646382255, true, '0102000020E610000002000000FAE9AEDF2C1C5E4017B536ABE1C136401E0A79582B1C5E40C6211F7AD2C13640');
INSERT INTO public."Park_Network" VALUES (42, '本館道路', 41, 46, 7.505910674482877, 7.505910674482877, 7.505910674482877, true, '0102000020E61000000200000010C66C97351C5E40A0AF2F46F1C136405C32D677341C5E40CC5EBACFF2C13640');
INSERT INTO public."Park_Network" VALUES (43, '本館道路', 46, 47, 4.443486800636135, 4.443486800636135, 4.443486800636135, true, '0102000020E6100000020000004FA9E37B341C5E40C2D2C235F3C1364086DA02BA341C5E40353C46AEF5C13640');
INSERT INTO public."Park_Network" VALUES (44, '本館道路', 47, 19, 36.251107221682076, 36.251107221682076, 36.251107221682076, true, '0102000020E610000002000000365DB7AE341C5E40353C46AEF5C13640E32772412F1C5E408E78D017FDC13640');
INSERT INTO public."Park_Network" VALUES (45, '本館道路', 48, 49, 27.11562666937291, 27.11562666937291, 27.11562666937291, true, '0102000020E6100000020000009B6E35252F1C5E40AF880BD4FCC136403AFB4DE32D1C5E4040306D79EDC13640');
INSERT INTO public."Park_Network" VALUES (46, '本館道路', 48, 50, 28.996135072325718, 28.996135072325718, 28.996135072325718, true, '0102000020E61000000200000054B5F8082F1C5E402D73672EFDC136407B3FC7AA2A1C5E40101B26D402C23640');
INSERT INTO public."Park_Network" VALUES (47, '本館道路', 50, 51, 7.4369742012029665, 7.4369742012029665, 7.4369742012029665, true, '0102000020E610000002000000D58021A52A1C5E40F335336302C2364007197A3F2A1C5E40A9327B3DFEC13640');
INSERT INTO public."Park_Network" VALUES (48, '本館道路', 51, 52, 8.739160927330389, 8.739160927330389, 8.739160927330389, true, '0102000020E610000002000000BF5F3D232A1C5E4088224081FEC136400E6F0AD6281C5E409EB1A25B00C23640');
INSERT INTO public."Park_Network" VALUES (49, '本館道路', 53, 52, 3.283269246161884, 3.283269246161884, 3.283269246161884, true, '0102000020E610000002000000F522DE08291C5E4015466E1F02C23640173319C5281C5E403EAC397200C23640');
INSERT INTO public."Park_Network" VALUES (50, '本館道路', 52, 54, 29.568660914875007, 29.568660914875007, 29.568660914875007, true, '0102000020E610000002000000C7B5CDB9281C5E4020C7460100C23640485DF306271C5E40D6A92BAEEFC13640');
INSERT INTO public."Park_Network" VALUES (51, '本館道路', 54, 55, 15.15271569819139, 15.15271569819139, 15.15271569819139, true, '0102000020E610000002000000A8625CF0261C5E4037AF9497EFC1364074EE06A5241C5E402803746AF2C13640');
INSERT INTO public."Park_Network" VALUES (52, '本館道路', 54, 56, 10.8409298769301, 10.8409298769301, 10.8409298769301, true, '0102000020E610000002000000485DF306271C5E40B9C4383DEFC13640CF79DCA8281C5E40C445111FEDC13640');
INSERT INTO public."Park_Network" VALUES (53, '本館道路', 54, 57, 37.11613744452993, 37.11613744452993, 37.11613744452993, true, '0102000020E610000002000000502102F6261C5E40B9C4383DEFC13640BCA743C1241C5E40C49EFCDADAC13640');
INSERT INTO public."Park_Network" VALUES (54, '本館道路', 57, 58, 4.391199308949115, 4.391199308949115, 4.391199308949115, true, '0102000020E6100000020000006D2AF8B5241C5E4022A465C4DAC136402E35CA88241C5E405FBD9640D8C13640');
INSERT INTO public."Park_Network" VALUES (55, '本館道路', 57, 59, 9.882181805537167, 9.882181805537167, 9.882181805537167, true, '0102000020E61000000200000069C870BE241C5E4043B4A080DAC136405E105930261C5E40BFC2FF29D8C13640');
INSERT INTO public."Park_Network" VALUES (56, '本館道路', 59, 60, 5.098865320506019, 5.098865320506019, 5.098865320506019, true, '0102000020E61000000200000059AED138261C5E407045B41ED8C13640D3FF66EF251C5E407FF1D44BD5C13640');
INSERT INTO public."Park_Network" VALUES (57, '本館道路', 60, 61, 32.50387247160211, 32.50387247160211, 32.50387247160211, true, '0102000020E6100000020000002B41C1E9251C5E40F07E5B13D5C13640229CE5B82A1C5E4026B54AE2CDC13640');
INSERT INTO public."Park_Network" VALUES (58, '本館道路', 61, 62, 33.739187613588584, 33.739187613588584, 33.739187613588584, true, '0102000020E6100000020000006DB7A9CC2A1C5E40E7BF1CB5CDC13640BB8F37D3281C5E40B9ABF721BBC13640');
INSERT INTO public."Park_Network" VALUES (59, '本館道路', 61, 63, 6.284889517651354, 6.284889517651354, 6.284889517651354, true, '0102000020E610000002000000BD34F5D72A1C5E40B527C41ACEC13640DF7B6F402B1C5E40B3D87880D1C13640');
INSERT INTO public."Park_Network" VALUES (60, '本館道路', 61, 64, 33.61963252717766, 33.61963252717766, 33.61963252717766, true, '0102000020E610000002000000695522D52A1C5E40363D68C0CDC136409A43EDD92F1C5E40AC6885BCC6C13640');
INSERT INTO public."Park_Network" VALUES (61, '本館道路', 64, 65, 5.092897171385025, 5.092897171385025, 5.092897171385025, true, '0102000020E6100000020000008ABBCFFB2F1C5E408A584A00C7C13640C44E7631301C5E401BA7C0E9C9C13640');
INSERT INTO public."Park_Network" VALUES (62, '本館道路', 65, 43, 8.821816195867697, 8.821816195867697, 8.821816195867697, true, '0102000020E61000000200000068AB943F301C5E402B2FDEC7C9C13640199CC78C311C5E40262899CBC7C13640');
INSERT INTO public."Park_Network" VALUES (63, '本館道路', 43, 66, 4.499730170839684, 4.499730170839684, 4.499730170839684, true, '0102000020E6100000020000006C7B9A8F311C5E401007B549C7C136403C5DC644311C5E4042AB13DBC4C13640');
INSERT INTO public."Park_Network" VALUES (64, '本館道路', 67, 68, 9.27984091927942, 9.27984091927942, 9.27984091927942, true, '0102000020E6100000020000005B21D75C241C5E4018227DD4F2C13640148833F8221C5E4078EE01B0F4C13640');
INSERT INTO public."Park_Network" VALUES (65, '本館道路', 68, 69, 22.894002819972954, 22.894002819972954, 22.894002819972954, true, '0102000020E61000000200000071DFB9DF221C5E40900FF7D9F4C13640B2589C751F1C5E40962FB8A8F9C13640');
INSERT INTO public."Park_Network" VALUES (66, '本館道路', 69, 70, 19.086301365358004, 19.086301365358004, 19.086301365358004, true, '0102000020E610000002000000F797A3591F1C5E406811A6EEF9C13640F3F556A51C1C5E40FBD34D1FFFC13640');
INSERT INTO public."Park_Network" VALUES (67, '本館道路', 71, 72, 10.55681924322712, 10.55681924322712, 10.55681924322712, true, '0102000020E610000002000000C4AAF62A1C1C5E40425B053700C23640C247E4831A1C5E4044A3B56A01C23640');
INSERT INTO public."Park_Network" VALUES (68, '本館道路', 73, 74, 7.159521260463386, 7.159521260463386, 7.159521260463386, true, '0102000020E61000000200000096836E4A1C1C5E4041135503FFC136404F208FCC1B1C5E40C7B95230FBC13640');
INSERT INTO public."Park_Network" VALUES (69, '本館道路', 75, 76, 14.012849671645629, 14.012849671645629, 14.012849671645629, true, '0102000020E6100000020000001E8D7E1E1A1C5E4072E59FBE01C23640A6968EF2171C5E40585822C7FFC13640');
INSERT INTO public."Park_Network" VALUES (70, '本館道路', 68, 77, 17.514003048136804, 17.514003048136804, 17.514003048136804, true, '0102000020E6100000020000002AA0B2FB221C5E404AD0EFF5F4C136405A0FEB0F241C5E40FAAF7585FEC13640');
INSERT INTO public."Park_Network" VALUES (71, '本館道路', 78, 79, 23.538312720129838, 23.538312720129838, 23.538312720129838, true, '0102000020E610000002000000998FCDD9221C5E40FD89C32FF4C136409931A197211C5E403FDAF40FE7C13640');


--
-- Data for Name: Park_Network_vertices_pgr; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Park_Network_vertices_pgr" VALUES (1, NULL, NULL, NULL, NULL, '0101000020E6100000EBDFBEDE131C5E40C5DD7A7C18C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (2, NULL, NULL, NULL, NULL, '0101000020E610000028E0E9A3111C5E401E11FB2517C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (3, NULL, NULL, NULL, NULL, '0101000020E6100000C26BBE000E1C5E400C96EC6FE9C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (4, NULL, NULL, NULL, NULL, '0101000020E6100000011197EE1F1C5E40B46F8E4ECBC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (5, NULL, NULL, NULL, NULL, '0101000020E61000005F12B81E221C5E40591AC651DFC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (6, NULL, NULL, NULL, NULL, '0101000020E6100000236C77582F1C5E40A0BFD28AAEC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (7, NULL, NULL, NULL, NULL, '0101000020E6100000CDD7A5E1391C5E40B32DAFC7A2C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (8, NULL, NULL, NULL, NULL, '0101000020E6100000C4237339161C5E4047C269A218C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (9, NULL, NULL, NULL, NULL, '0101000020E61000001BC37FC01B1C5E40A257BC6315C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (10, NULL, NULL, NULL, NULL, '0101000020E6100000FA4E208B221C5E40AD2F58F918C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (11, NULL, NULL, NULL, NULL, '0101000020E6100000EB894BE4271C5E4009BD4A2E1EC23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (12, NULL, NULL, NULL, NULL, '0101000020E6100000B1742A012B1C5E40EE2AFFFD1DC23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (13, NULL, NULL, NULL, NULL, '0101000020E61000003F3509692A1C5E406B32991116C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (14, NULL, NULL, NULL, NULL, '0101000020E61000001BC2147A261C5E40E93933250EC23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (15, NULL, NULL, NULL, NULL, '0101000020E6100000C41ED82C251C5E40AD22B80800C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (16, NULL, NULL, NULL, NULL, '0101000020E6100000FA46C0FE2A1C5E40FBEC0E2512C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (17, NULL, NULL, NULL, NULL, '0101000020E6100000C716994B371C5E40E4464F6900C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (18, NULL, NULL, NULL, NULL, '0101000020E610000060AFF29D301C5E402F1A920309C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (19, NULL, NULL, NULL, NULL, '0101000020E610000071678A552F1C5E40D292E777FDC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (20, NULL, NULL, NULL, NULL, '0101000020E610000018CE07CE361C5E40BFDE7F86FAC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (21, NULL, NULL, NULL, NULL, '0101000020E6100000A78D39992D1C5E4049BE39DC1CC23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (22, NULL, NULL, NULL, NULL, '0101000020E6100000A2A90DB1361C5E40FCEB823313C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (23, NULL, NULL, NULL, NULL, '0101000020E6100000A2A7F5CD381C5E4045C6996814C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (24, NULL, NULL, NULL, NULL, '0101000020E6100000EB8298F4381C5E40673C11810BC23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (25, NULL, NULL, NULL, NULL, '0101000020E6100000679578BF381C5E40E64007C006C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (26, NULL, NULL, NULL, NULL, '0101000020E61000008A02045A391C5E40F6FF7212FEC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (27, NULL, NULL, NULL, NULL, '0101000020E6100000DFAFD9C1391C5E402C27AE47FBC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (28, NULL, NULL, NULL, NULL, '0101000020E6100000C80AE84D3A1C5E406B2929E7F8C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (29, NULL, NULL, NULL, NULL, '0101000020E61000002B5681F7391C5E400681FE87F5C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (30, NULL, NULL, NULL, NULL, '0101000020E610000008215A83371C5E409EEC6802E0C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (31, NULL, NULL, NULL, NULL, '0101000020E6100000A6F2825D371C5E409079AFD3DEC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (32, NULL, NULL, NULL, NULL, '0101000020E61000002688DADC361C5E406776E144D9C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (33, NULL, NULL, NULL, NULL, '0101000020E61000001F3926C6361C5E4059032816D8C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (34, NULL, NULL, NULL, NULL, '0101000020E61000009FCE7D45361C5E40C782CE4AD2C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (35, NULL, NULL, NULL, NULL, '0101000020E610000030589CEF331C5E40F8C60B86BAC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (36, NULL, NULL, NULL, NULL, '0101000020E61000002909E8D8331C5E40700DAFEEB9C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (37, NULL, NULL, NULL, NULL, '0101000020E6100000FD595D4F321C5E407B6743DCABC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (38, NULL, NULL, NULL, NULL, '0101000020E610000060AA1E95391C5E40116E2A2FD4C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (39, NULL, NULL, NULL, NULL, '0101000020E610000021BA33C2331C5E40EB8381E1DDC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (40, NULL, NULL, NULL, NULL, '0101000020E61000006CFBEDA3331C5E40BE7E985ADEC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (41, NULL, NULL, NULL, NULL, '0101000020E6100000181521AE351C5E40EBF0E927F1C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (42, NULL, NULL, NULL, NULL, '0101000020E6100000BF8B5C9C331C5E40CD47B086DDC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (43, NULL, NULL, NULL, NULL, '0101000020E610000013722992311C5E402A3B784BC7C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (44, NULL, NULL, NULL, NULL, '0101000020E610000004A91166321C5E40EA2D23E4DFC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (45, NULL, NULL, NULL, NULL, '0101000020E61000003551F208361C5E40618BD095F4C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (46, NULL, NULL, NULL, NULL, '0101000020E61000005C32D677341C5E40CC5EBACFF2C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (47, NULL, NULL, NULL, NULL, '0101000020E610000086DA02BA341C5E40353C46AEF5C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (48, NULL, NULL, NULL, NULL, '0101000020E61000009B6E35252F1C5E40AF880BD4FCC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (49, NULL, NULL, NULL, NULL, '0101000020E61000003AFB4DE32D1C5E4040306D79EDC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (50, NULL, NULL, NULL, NULL, '0101000020E61000007B3FC7AA2A1C5E40101B26D402C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (51, NULL, NULL, NULL, NULL, '0101000020E610000007197A3F2A1C5E40A9327B3DFEC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (52, NULL, NULL, NULL, NULL, '0101000020E61000000E6F0AD6281C5E409EB1A25B00C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (53, NULL, NULL, NULL, NULL, '0101000020E6100000F522DE08291C5E4015466E1F02C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (54, NULL, NULL, NULL, NULL, '0101000020E6100000485DF306271C5E40D6A92BAEEFC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (55, NULL, NULL, NULL, NULL, '0101000020E610000074EE06A5241C5E402803746AF2C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (56, NULL, NULL, NULL, NULL, '0101000020E6100000CF79DCA8281C5E40C445111FEDC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (57, NULL, NULL, NULL, NULL, '0101000020E6100000BCA743C1241C5E40C49EFCDADAC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (58, NULL, NULL, NULL, NULL, '0101000020E61000002E35CA88241C5E405FBD9640D8C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (59, NULL, NULL, NULL, NULL, '0101000020E61000005E105930261C5E40BFC2FF29D8C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (60, NULL, NULL, NULL, NULL, '0101000020E6100000D3FF66EF251C5E407FF1D44BD5C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (61, NULL, NULL, NULL, NULL, '0101000020E6100000229CE5B82A1C5E4026B54AE2CDC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (62, NULL, NULL, NULL, NULL, '0101000020E6100000BB8F37D3281C5E40B9ABF721BBC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (63, NULL, NULL, NULL, NULL, '0101000020E6100000DF7B6F402B1C5E40B3D87880D1C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (64, NULL, NULL, NULL, NULL, '0101000020E61000009A43EDD92F1C5E40AC6885BCC6C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (65, NULL, NULL, NULL, NULL, '0101000020E6100000C44E7631301C5E401BA7C0E9C9C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (66, NULL, NULL, NULL, NULL, '0101000020E61000003C5DC644311C5E4042AB13DBC4C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (67, NULL, NULL, NULL, NULL, '0101000020E61000005B21D75C241C5E4018227DD4F2C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (68, NULL, NULL, NULL, NULL, '0101000020E6100000148833F8221C5E4078EE01B0F4C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (69, NULL, NULL, NULL, NULL, '0101000020E6100000B2589C751F1C5E40962FB8A8F9C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (70, NULL, NULL, NULL, NULL, '0101000020E6100000F3F556A51C1C5E40FBD34D1FFFC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (71, NULL, NULL, NULL, NULL, '0101000020E6100000C4AAF62A1C1C5E40425B053700C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (72, NULL, NULL, NULL, NULL, '0101000020E6100000C247E4831A1C5E4044A3B56A01C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (73, NULL, NULL, NULL, NULL, '0101000020E610000096836E4A1C1C5E4041135503FFC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (74, NULL, NULL, NULL, NULL, '0101000020E61000004F208FCC1B1C5E40C7B95230FBC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (75, NULL, NULL, NULL, NULL, '0101000020E61000001E8D7E1E1A1C5E4072E59FBE01C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (76, NULL, NULL, NULL, NULL, '0101000020E6100000A6968EF2171C5E40585822C7FFC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (77, NULL, NULL, NULL, NULL, '0101000020E61000005A0FEB0F241C5E40FAAF7585FEC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (78, NULL, NULL, NULL, NULL, '0101000020E6100000998FCDD9221C5E40FD89C32FF4C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (79, NULL, NULL, NULL, NULL, '0101000020E61000009931A197211C5E403FDAF40FE7C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (80, NULL, NULL, NULL, NULL, '0101000020E6100000FAE9AEDF2C1C5E4017B536ABE1C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (81, NULL, NULL, NULL, NULL, '0101000020E61000001E0A79582B1C5E40C6211F7AD2C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (82, NULL, NULL, NULL, NULL, '0101000020E6100000E74EEB56241C5E40D2077F23D6C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (83, NULL, NULL, NULL, NULL, '0101000020E6100000D08681492C1C5E40463DD5ADEDC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (84, NULL, NULL, NULL, NULL, '0101000020E61000002A1B96732C1C5E4013639FDFE7C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (85, NULL, NULL, NULL, NULL, '0101000020E6100000FDF69DE62B1C5E40F1B07BBFDDC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (86, NULL, NULL, NULL, NULL, '0101000020E6100000B5577D862F1C5E407567F3DFEAC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (87, NULL, NULL, NULL, NULL, '0101000020E6100000309F70CF2E1C5E40F41D2391DFC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (88, NULL, NULL, NULL, NULL, '0101000020E6100000562C853C2D1C5E4031D01B02E4C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (89, NULL, NULL, NULL, NULL, '0101000020E61000007B0E48C52D1C5E4038A26F9DE5C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (90, NULL, NULL, NULL, NULL, '0101000020E6100000CB08E0953B1C5E40C6B5D0AEF6C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (91, NULL, NULL, NULL, NULL, '0101000020E610000072EE260F411C5E4091C876BDEEC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (92, NULL, NULL, NULL, NULL, '0101000020E6100000055B9F62401C5E40F70CF0B4E7C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (93, NULL, NULL, NULL, NULL, '0101000020E6100000C26618BD401C5E407AB3179EEBC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (94, NULL, NULL, NULL, NULL, '0101000020E6100000B319B729491C5E408376D2BBDFC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (95, NULL, NULL, NULL, NULL, '0101000020E6100000D2779F56471C5E401F6C32A5E5C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (96, NULL, NULL, NULL, NULL, '0101000020E6100000AAB16F9D491C5E401E652C7EE3C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (97, NULL, NULL, NULL, NULL, '0101000020E6100000DF179D2E4A1C5E40E8557B86E8C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (98, NULL, NULL, NULL, NULL, '0101000020E6100000015AF28B451C5E40A15766A6F0C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (99, NULL, NULL, NULL, NULL, '0101000020E6100000955EB3FF421C5E4079CE66D5F4C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (100, NULL, NULL, NULL, NULL, '0101000020E61000000FF2CA58411C5E40CE92E1F4F8C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (101, NULL, NULL, NULL, NULL, '0101000020E610000045A41CFA401C5E406A9D2F33FBC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (102, NULL, NULL, NULL, NULL, '0101000020E6100000126401F13F1C5E40AB022A71FAC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (103, NULL, NULL, NULL, NULL, '0101000020E61000005AC0CF223F1C5E40C6EC0DA7F6C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (104, NULL, NULL, NULL, NULL, '0101000020E6100000838FD1BD3E1C5E40234C2913F2C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (105, NULL, NULL, NULL, NULL, '0101000020E61000008FBD98FD421C5E40D6EC93A804C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (106, NULL, NULL, NULL, NULL, '0101000020E6100000D435FAFE441C5E409812F8BF05C23640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (107, NULL, NULL, NULL, NULL, '0101000020E6100000748E943A461C5E40FF1A7879FFC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (108, NULL, NULL, NULL, NULL, '0101000020E6100000042944214C1C5E4030731EBEF4C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (109, NULL, NULL, NULL, NULL, '0101000020E6100000944998644C1C5E40C98E56EDFAC13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (110, NULL, NULL, NULL, NULL, '0101000020E6100000F76F2A51391C5E404FF2A702E9C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (111, NULL, NULL, NULL, NULL, '0101000020E61000008ADCA2A4381C5E401ADCEABCE9C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (112, NULL, NULL, NULL, NULL, '0101000020E610000077EFD3E53B1C5E4015EE1B43B8C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (113, NULL, NULL, NULL, NULL, '0101000020E6100000F6D7E1303B1C5E40A9F8753AB0C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (114, NULL, NULL, NULL, NULL, '0101000020E6100000ECC3E3BF411C5E4016D132E1D2C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (115, NULL, NULL, NULL, NULL, '0101000020E6100000B39F5B86431C5E406925C9FAE7C13640');
INSERT INTO public."Park_Network_vertices_pgr" VALUES (116, NULL, NULL, NULL, NULL, '0101000020E6100000F99D61E43F1C5E40B08CD8E2E1C13640');


--
-- Data for Name: Qr_Code; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Qr_Code" VALUES ('a85e4152-7298-43d5-8b6e-97693d6e42bd', '測試主題_張三_5人_202609021000', 'itinerary', '60bfb4dc-4ebf-4238-b02a-9e31907a92cd', 0, '2026-09-01 21:06:23.940494', NULL);
INSERT INTO public."Qr_Code" VALUES ('d1b318ed-c89d-4173-9be0-483aec986692', '攝手之旅_賴廷宇_1人_202609021000', 'itinerary', '513b8087-604f-47cd-a8b9-f6b300bbaf7a', 0, '2026-09-01 21:08:58.652696', NULL);
INSERT INTO public."Qr_Code" VALUES ('041ea93a-f809-406d-bce1-bf0dc6898f9d', '浪漫之旅_劉冠廷_5人_202609021200', 'itinerary', '9bbeb94c-5f99-4fa3-abec-4323813d40e1', 0, '2026-09-01 21:28:46.610402', NULL);


--
-- Data for Name: Recommended_Itinerary_Group; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Recommended_Itinerary_Group" VALUES ('6f7689f5-26cc-424e-bf16-a20d7063bac6', 300, '/uploads/images/themes/religion.jpg', '2026-08-24 05:16:00', '2026-08-24 05:16:00');
INSERT INTO public."Recommended_Itinerary_Group" VALUES ('b7d42a19-5781-4878-aa34-46333a3480f4', 400, '/uploads/images/themes/romantic.jpg', '2026-08-24 05:16:00', '2026-08-24 05:16:00');
INSERT INTO public."Recommended_Itinerary_Group" VALUES ('2710e9b8-589e-4c01-b9c9-215caef97054', 500, '/uploads/images/themes/treasure.jpg', '2026-08-24 05:16:00', '2026-08-24 05:16:00');
INSERT INTO public."Recommended_Itinerary_Group" VALUES ('86252480-d939-4802-ae9e-02909e5e542a', 300, '/uploads/images/themes/family.jpg', '2026-08-24 05:16:00', '2026-08-24 05:16:00');
INSERT INTO public."Recommended_Itinerary_Group" VALUES ('6c45c46e-9289-4a8a-9d66-0c8f461d01f8', 400, '/uploads/images/themes/art.jpg', '2026-08-24 05:16:00', '2026-08-24 05:16:00');
INSERT INTO public."Recommended_Itinerary_Group" VALUES ('2346c79a-36ae-4351-8339-39abbd701ad2', 500, '/uploads/images/themes/food.jpg', '2026-08-24 05:16:00', '2026-08-24 05:16:00');
INSERT INTO public."Recommended_Itinerary_Group" VALUES ('affddccc-eb1a-4d9d-bd51-c65297b16954', 300, '/uploads/images/themes/photograph.jpg', '2026-08-24 05:16:00', '2026-08-24 05:16:00');
INSERT INTO public."Recommended_Itinerary_Group" VALUES ('7f5d8a38-4496-4084-a33e-0c65b1ce6f1d', 400, '/uploads/images/themes/nature.jpg', '2026-08-24 05:16:00', '2026-08-24 05:16:00');


--
-- Data for Name: Recommended_Itinerary_Item; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Recommended_Itinerary_Item" VALUES ('1c409025-e2e5-4c19-be27-268bf6d96e71', '6f7689f5-26cc-424e-bf16-a20d7063bac6', 'attractions', 'e38f1743-e90e-49be-9ca4-851f3c45b0b4', 120, 2);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('143597fc-e2d7-4b1c-9bb0-b852c5268c4d', 'b7d42a19-5781-4878-aa34-46333a3480f4', 'attractions', 'e38f1743-e90e-49be-9ca4-851f3c45b0b4', 120, 2);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('4d50cdcd-dcfb-43e8-96d8-079da2a731d1', '2710e9b8-589e-4c01-b9c9-215caef97054', 'attractions', 'c8e67edc-4e03-436d-8e74-6d994766f820', 60, 3);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('7850c935-0729-4a54-61d5-9c60ac91e21d', '2710e9b8-589e-4c01-b9c9-215caef97054', 'attractions', '9da51fd6-f5bf-4c2b-a8c9-ca5de5d687b7', 60, 5);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('87447d75-e8dd-4155-b875-6172a5db1d85', '86252480-d939-4802-ae9e-02909e5e542a', 'attractions', '2d9c27e1-082d-4832-b623-de04d9340c74', 30, 3);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('4f3c2ebd-7a87-40e8-8f28-22c232084101', '86252480-d939-4802-ae9e-02909e5e542a', 'attractions', 'e38f1743-e90e-49be-9ca4-851f3c45b0b4', 60, 5);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('83753582-9dd0-4c8a-b91a-d783de7ae89d', '6c45c46e-9289-4a8a-9d66-0c8f461d01f8', 'attractions', 'fb008019-8b56-4740-b61c-39908e456e3f', 120, 2);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('a9886148-882c-420b-bd3b-5cec78d339d1', '6c45c46e-9289-4a8a-9d66-0c8f461d01f8', 'attractions', 'cd50ddb2-938e-4364-98f2-150a643c5035', 60, 3);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('3145d1c8-dc2d-4e71-bda5-1d9d86d0573c', '2346c79a-36ae-4351-8339-39abbd701ad2', 'attractions', 'b2273943-5ac9-4706-8796-af801c0d6610', 30, 4);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('12fd8a3d-2bd6-4094-9732-af70c15cc4b6', '7f5d8a38-4496-4084-a33e-0c65b1ce6f1d', 'attractions', 'cd50ddb2-938e-4364-98f2-150a643c5035', 60, 1);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('0484293a-0aa8-47df-8112-c8ab488ddc02', 'affddccc-eb1a-4d9d-bd51-c65297b16954', 'attractions', 'e70e5af4-0c13-4cae-bc04-1f0a787ed5a7', 30, 1);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('0715705f-351b-4f35-952c-6683d221be94', 'b7d42a19-5781-4878-aa34-46333a3480f4', 'attractions', '6b817a09-b8f0-42af-880f-28a08582c18d', 90, 1);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('19318418-f9a4-4a4a-b513-fa99ad6cfc39', 'b7d42a19-5781-4878-aa34-46333a3480f4', 'attractions', 'e70e5af4-0c13-4cae-bc04-1f0a787ed5a7', 60, 4);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('1b62bb6d-4c8f-4113-bb6a-1968bdcb211c', '2346c79a-36ae-4351-8339-39abbd701ad2', 'attractions', 'a3b4182d-55c7-42dc-bd4b-41d33111dc6d', 30, 1);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('261b4a51-a606-4189-b056-cec768d86ee1', '6c45c46e-9289-4a8a-9d66-0c8f461d01f8', 'attractions', '6130615d-5fcf-4ccc-aca9-e1210260675f', 30, 4);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('2fbc979d-bcce-4184-a9b9-93cfc7f73f5f', '2346c79a-36ae-4351-8339-39abbd701ad2', 'attractions', 'c6b30fa4-6eaa-4cf7-a46c-4a7b281b4a66', 90, 3);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('3906a5d7-bd3d-479e-95d3-dcd8b2899df2', '2710e9b8-589e-4c01-b9c9-215caef97054', 'attractions', 'a993228f-976e-4018-949d-d83160b9bbfe', 60, 2);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('4b963b37-7511-4cba-80c4-2818879624d8', '6c45c46e-9289-4a8a-9d66-0c8f461d01f8', 'attractions', 'a8de4c89-f2ea-478b-a365-d276dc299702', 60, 1);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('759f1431-4442-443a-9c91-fa64f11686dc', 'affddccc-eb1a-4d9d-bd51-c65297b16954', 'attractions', 'd21c48f4-56ff-410c-883c-df6c332e3b69', 120, 4);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('7b5b023b-a93b-45f9-b927-aacd53f7b895', '86252480-d939-4802-ae9e-02909e5e542a', 'attractions', 'cd50ddb2-938e-4364-98f2-150a643c5035', 120, 1);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('7f2698d3-bd49-4bf9-9c4d-b6d16645c6c7', '6f7689f5-26cc-424e-bf16-a20d7063bac6', 'attractions', '9da51fd6-f5bf-4c2b-a8c9-ca5de5d687b7', 60, 1);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('96108a7b-a967-4ce0-9ee5-57e24aa32d74', '7f5d8a38-4496-4084-a33e-0c65b1ce6f1d', 'attractions', 'e38f1743-e90e-49be-9ca4-851f3c45b0b4', 120, 3);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('9757c935-0729-4a54-81d4-9c60ac10e67d', '2710e9b8-589e-4c01-b9c9-215caef97054', 'attractions', '6130615d-5fcf-4ccc-aca9-e1210260675f', 120, 4);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('9ed67738-4326-4c3e-81ee-39cb31549e3b', '2346c79a-36ae-4351-8339-39abbd701ad2', 'attractions', '877633c0-191b-4752-95e7-673fb876592e', 120, 2);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('a6d48690-2ad6-4c5f-8a9f-0f8570e0c14b', '86252480-d939-4802-ae9e-02909e5e542a', 'attractions', '2920a187-6b82-4bfd-b9ae-6de4944d01a7', 60, 4);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('af23dfdc-e8f0-4743-b0fa-9f8519175e79', 'b7d42a19-5781-4878-aa34-46333a3480f4', 'attractions', '9da51fd6-f5bf-4c2b-a8c9-ca5de5d687b7', 120, 3);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('b9e5c304-5c28-4887-8463-0f75dd0355d9', '2710e9b8-589e-4c01-b9c9-215caef97054', 'attractions', '8606eaf8-34be-4cbd-bcbc-019e8ddd2656', 60, 1);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('d145e1be-e72e-4be3-9f01-9da254753746', '86252480-d939-4802-ae9e-02909e5e542a', 'attractions', 'c8f289ac-1d5d-4912-a25a-d89120b2a008', 60, 2);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('d5c6b50a-c60e-4ea9-b3aa-b0805a8c688f', '7f5d8a38-4496-4084-a33e-0c65b1ce6f1d', 'attractions', 'b2273943-5ac9-4706-8796-af801c0d6610', 120, 2);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('e08a672e-5c32-4370-a4df-d48924379d4b', '6f7689f5-26cc-424e-bf16-a20d7063bac6', 'attractions', 'a993228f-976e-4018-949d-d83160b9bbfe', 120, 3);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('e9d211be-8628-4948-84ad-44dae010e9c7', 'affddccc-eb1a-4d9d-bd51-c65297b16954', 'attractions', 'a993228f-976e-4018-949d-d83160b9bbfe', 120, 3);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('f09ef45c-c333-490f-a9a4-3ac38d90e3a8', 'affddccc-eb1a-4d9d-bd51-c65297b16954', 'attractions', 'e38f1743-e90e-49be-9ca4-851f3c45b0b4', 60, 2);
INSERT INTO public."Recommended_Itinerary_Item" VALUES ('f6c511e9-f01b-4013-b182-efb5cc61fe1a', '6f7689f5-26cc-424e-bf16-a20d7063bac6', 'attractions', '63a01ed5-2b70-45c7-811f-377f6290659b', 60, 4);


--
-- Data for Name: Recommended_Itinerary_Translations; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('4dc2be64-09b8-434c-9d9c-53a58dcaf507', '6f7689f5-26cc-424e-bf16-a20d7063bac6', 'zh_TW', '宗教之旅', '無論您是不是佛教徒，在此都可以感受到佛陀的祝福。佛陀紀念館整座建築群，都蘊含著佛法的精髓，潛移默化著來者的心舍，以期豐富的典藏及非物質美學，讓人一踏入此地，就有火宅清涼的感受。世界級瑰寶「佛陀真身舍利」、亞洲最大銅鑄坐佛的佛光大佛、仿陝西法門寺的地宮、泰國僧王餽贈的金佛、緬甸白玉臥佛、來自韓國的金剛經塔、千手千眼觀音……，這些瑰寶都是世界級的典藏，來到佛陀紀念館，就像得到萬佛的護持。至於非物質的宗教體驗，像是站在成佛大道上，體驗猶如穿越時空回到盛唐，八座寶塔一路通往佛光大佛和博物館本館，氣勢雄渾令人心生恭敬，這種宗教的攝受感，超越了一般博物館給人的感受。', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('d95dcea5-4a25-4b37-aba1-3e9241ee2ab9', 'b7d42a19-5781-4878-aa34-46333a3480f4', 'zh_TW', '浪漫之旅', '只要是與佛有關的地方，都是嚴肅不苟言笑之地嗎？佛紀念館絕不但但是情人漫步的好去處，決定白頭偕老的新人，還可以在「五和塔」的喜慶之家，舉行別具創意的佛化婚禮，或文定之喜。佛陀從不反對正常的家庭人倫，新人、家人到了佛陀紀念館，讓佛陀紀念館彷彿也升起了粉紅泡泡，也跟著浪漫起來。靠近樟樹林滴水坊的祇園，特別為新人佈置婚紗攝影景點，以象徵高貴的牡丹、代表浪漫的玫瑰、還有色彩繽紛的繡球花等花材，營造喜氣洋洋的景致。五和塔喜慶之家，每年持續為許多新人舉行佛化婚禮或文定之禮，在佛光大佛見證下，締結良緣。歡迎新人至佛館五和塔登記舉行婚禮，也可選擇到佛館拍攝婚紗，接受佛陀最神聖的祝福。', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('c59c9a19-a464-4d30-bc99-ab5b3e02d798', '2710e9b8-589e-4c01-b9c9-215caef97054', 'zh_TW', '尋寶之旅', '佛陀紀念館蒐集豐富館藏，世界僅有的佛牙舍利，或是珍貴古物彩繪藻井，都讓人嘖嘖稱奇。水晶材質半圓剎座相托晶瑩剔透塔剎，光明閃耀舍利塔，塔內安奉佛牙舍利，在世界僅有三顆，其中一個就在佛陀紀念館玉佛殿內，但玉佛殿可不只如此。兩側牆面立體木雕雄偉壯觀，利用香木雕成世界各地不同形式佛塔，象徵佛陀度化眾生遍滿十方。佛陀紀念館館藏數件珍寶，無論是本館普陀洛伽山觀音殿的主尊千手千眼觀世音菩薩、還是佛館內首件古物，珍貴彩繪藻井；佛館珍藏珍寶，都讓民眾嘖嘖稱奇。', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('f159e39e-9d1d-49c0-b38e-8910a2e55326', '86252480-d939-4802-ae9e-02909e5e542a', 'zh_TW', '親子之旅', '佛陀紀念館目前佔地五十公頃，遼闊的空間不僅是宗教聖地，同時也是親子踏青、體驗佛法與科技結合的好去處。「祇園」草木扶疏，生態園區有紫斑蝶、綠頭鴨……。館內南北長廊外側的護生圖，更是親子共讀生命教育的樂趣。此外，親子可以一同前往觀音殿，向觀世音菩薩祈求甘露法水，善財童子和龍女會轉動銜接觀音菩薩的祝福，為祈求者倒入大悲咒水，得者無不歡欣雀躍。', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('51445798-ebdf-41c0-be14-8d21b5a21a04', '6c45c46e-9289-4a8a-9d66-0c8f461d01f8', 'zh_TW', '藝文之旅', '佛陀紀念館的建築樣式融合佛陀原鄉的窣堵坡式，融合古印度、中印度與 唐、宋、元、明、清等，歷代佛像、佛塔的建築美學而成。透由瞻禮佛陀紀念館， 可深深領會綜貫古今，橫跨中印的建築之美。每一座建築物與大自然無縫相容，隨早晚和四季變化，景色巧妙各不同。', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('80a9f065-a883-43b7-b458-1c89c8342ec6', '2346c79a-36ae-4351-8339-39abbd701ad2', 'zh_TW', '美食之旅', '佛陀紀念館內，設置了許多滴水坊，及一處自助餐，每一座滴水坊也都有不同的特色，皆為提供來訪民眾休憩與滿足味蕾的場所，民眾可在餐廳裡品嘗到不同風格的美食，或喝杯咖啡吃些點心，稍坐片刻欣賞不同角度的佛館風景後，再繼續參觀。', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('4e87f323-4c96-4719-bd75-b3b577275dc0', 'affddccc-eb1a-4d9d-bd51-c65297b16954', 'zh_TW', '攝手之旅', '佛陀紀念館於2012年榮獲第13屆「國家建築金獎」之文化教育類金獅獎，每一處建築設計總是令人震撼驚喜，成佛大道、萬人照相台、大佛平台、崇高的佛光大佛、北長廊、祇園等，經常可見遊客拍照與好友分享，乃是打卡熱點。', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('21d29873-cce6-4ddb-95c2-711a48d3e97f', '7f5d8a38-4496-4084-a33e-0c65b1ce6f1d', 'zh_TW', '生態之旅', '佛陀紀念館在建館時，保留了當地許多的原生態，加上後來的特意植栽護育，引來了紫斑蝶、綠頭鴨、大白鵝到此棲息綿延後代，在廣闊的樹林植披中，清新的芬多精洗滌了人們的心靈，感受到人與大自然本是生命共同體。穿梭在蝴蝶群中，聽著啁啾的蟲鳴鳥叫，豐富的生態、清幽的環境，讓人學習到生命與自然生態的可貴，大自然就這樣給大小朋友無聲地，上了一堂生命教育課。', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('dbe60fd4-c7de-4e65-98c6-86738f8e7828', '6f7689f5-26cc-424e-bf16-a20d7063bac6', 'en', 'Religious Route', 'Whether you are a Buddhist or not, you can feel the blessings of the Buddha here. The entire complex of the Buddha Museum is imbued with the essence of the Buddha''s teachings, and is a subtle influence on the minds of the visitors, providing one with a rich artistic collection and intangible beauty that will bring a sense of coolness as soon as one steps inside.
The Buddha''s tooth relic, the world''s largest copper-cast Fo Guang Big Buddha, a replica of the underground palace at the Famen Temple in Shaanxi, the Golden Buddha gifted by Thailand''s Sangharaja, the Reclining Buddha statue made from Burmese white jade, the golden kasaya from Korea, and the Thousand-Headed, Thousand-Eyed Avalokitesvara ...... are all world-class treasures that one will find in the Buddha Museum.
When one stands on the Great Path to Buddhahood, it takes one back in time and space to the Tang dynasty, with Eight Pagodas leading one to the Buddha and the Main Hall, providing one with a majestic and humbling religious experience that surpasses the ordinary museum experience.', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('c5f04f11-5d75-4925-a997-d9e5d3d49db7', 'b7d42a19-5781-4878-aa34-46333a3480f4', 'en', 'Romantic Route', 'Is the Buddha Museum a solemnly religious place? No, instead the Buddha Museum is a good place for lovers to take a stroll. For couples who have decided to grow old together, they can have their wedding ceremony at the Five Harmonies Pagoda or have their wedding ceremony in a special way. The Buddha never objected to normal family relationships, so when the new couple and their families come to the Buddha Museum, it will seem as if pink bubbles are rising in the Buddha Museum, making it even more romantic than ever.
The Jetavana Grove, decorated with flowers such as peonies, roses, and hydrangeas symbolizing romance, is a special place for wedding photography.
The Five Harmonies Pagoda celebrates many weddings every year, and in the presence of the Buddha, many couples tied the knot. Couples are welcome to register their weddings at the Five Harmonies Pagoda, where they will receive the Buddha''s blessings.', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('e6463934-393d-41cb-8cc4-27f0ec358f7a', '2710e9b8-589e-4c01-b9c9-215caef97054', 'en', 'Treasure Hunt Route', 'There are many treasures in the Fo Guang Shan Buddha Museum, including the Buddha''s tooth relic, Great Compassion Mantra Caissons, and many more. Inside the shining crystal stupa holds one of three tooth relics remaining in the world, currently enshrined in the Jade Buddha Shrine of the Buddha Museum. The Forest of Stupas, Avalokitesvara Bodhisattva, Caissons, and ancient artifacts are all Treasures of the Buddha Museum.', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('dd66b5fa-6ffc-4d32-a54c-05ea74dc3f35', '86252480-d939-4802-ae9e-02909e5e542a', 'en', 'Family Route', 'The Buddha Museum currently occupies an area of fifty hectares, a vast space that serves not only as a religious shrine but also as a good spot for families and children to experience a combination of Buddhism and technology. Jetavana Grove is an ecological park with butterflies and mallards. The Life Protection Murals along the outer walls of the covered walkways are great fun for parents and children to learn about life together.
In addition, families can go to the Avalokitesvara Shrine and pray to Avalokitesvara for Great Compassion Water. When Sudhana and Naga Girl receive the blessings from Avalokitesvara, they will pour the water from the prayers and bring them to the visitors.', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('86b4308f-c75a-46a4-a59b-4adbafb2ee6a', '6c45c46e-9289-4a8a-9d66-0c8f461d01f8', 'en', 'Cultural Route', 'The architectural style of the Buddha Museum is a fusion of the Buddha statues and pagodas of ancient India and Chinese Tang, Song, Yuan, Ming and Qing dynasties. By visiting the Buddha Museum, one can view the architectural beauty that unites ancient and modern times which spans across China and India. Each structure is seamlessly compatible with nature and the scenery varies from day to night across all seasons.', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('041bdd67-ccd2-4d6a-b765-da8e988f4de1', '2346c79a-36ae-4351-8339-39abbd701ad2', 'en', 'Gourmet Route', 'Inside the Buddha Museum, there is a buffet and a number of Waterdrop Teahouses, providing visitors with a place to satisfy their taste buds with unique menus featuring different vegetarian cuisine. There are also various spots where visitors can have a cup of coffee or a quick snack during their tours.', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('862b992e-1180-4872-a44a-430cf2ba1a20', 'affddccc-eb1a-4d9d-bd51-c65297b16954', 'en', 'Photography Route', 'The Buddha Museum won the Golden Lion Award in the Culture and Education category of the 13th National Gold Medal for Architecture in 2012. Every architectural design is stunning and surprising, including the Great Path to Buddhahood, the Grand Photo Terrace, the Big Buddha Terrace, the sublime Buddha, the Northern Walkway, the Jetavana Grove. It is common to see visitors taking photos and share them with their friends, making the Museum a hot spot for social media check in''s.', NULL, NULL);
INSERT INTO public."Recommended_Itinerary_Translations" VALUES ('6cabf163-50d6-4efc-ab81-a92772eb873a', '7f5d8a38-4496-4084-a33e-0c65b1ce6f1d', 'en', 'Ecology Route', 'When the Buddha Museum was built, many of the local native habitats were preserved, and with special efforts in conservation, butterflies, mallards, and geese were attracted to this habitat and will continue to reside here for generations to come. Walking among the butterflies, listening to the chirping of insects and birds, enjoying the rich ecology and the seclusion of the environment, people learn the value of life as nature gives friends of all ages a silent lesson on life education.', NULL, NULL);


--
-- Data for Name: Restaurant; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Restaurant_Translations; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Tour_Schedule; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: Visiter; Type: TABLE DATA; Schema: public; Owner: GavinLou
--

INSERT INTO public."Visiter" VALUES ('1b899729-5a12-4e22-b247-7c9aa5815f9e', 'visiter01@gmail.com', '7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c', '陳冠宇', 'male', '0987654321', true, false, '2026-08-17 17:42:00', '2026-08-17 17:42:00');
INSERT INTO public."Visiter" VALUES ('4c6e9d2e-4a7d-42d8-9fd0-18c9dc9a9fe7', 'visiter02@gmail.com', '7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c', '林建宏', 'male', '0921548900', true, false, '2026-08-17 17:42:00', '2026-08-17 17:42:00');
INSERT INTO public."Visiter" VALUES ('e10802c3-1c8b-4c64-ab4e-a905ef249095', 'visiter03@gmail.com', '7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c', '張家豪', 'male', '0955443479', true, true, '2026-08-17 17:42:00', '2026-08-17 17:42:00');
INSERT INTO public."Visiter" VALUES ('0a57bb5b-1aa6-47d9-88ee-02bec9a5ed25', 'visiter04@gmail.com', '7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c', '黃柏翰', 'male', '0989338058', false, false, '2026-08-17 17:42:00', '2026-08-17 17:42:00');
INSERT INTO public."Visiter" VALUES ('3f2abb3d-bd20-4d29-a1fd-7237a1a44e5a', 'visiter05@gmail.com', '7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c', '賴廷宇', 'male', '0923232637', true, true, '2026-08-17 17:42:00', '2026-08-17 17:42:00');
INSERT INTO public."Visiter" VALUES ('7d263945-6a0c-4736-8c3d-cd1f154d66dd', 'visiter06@gmail.com', '7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c', '陳婷婷', 'female', '0957127216', true, true, '2026-08-17 17:42:00', '2026-08-17 17:42:00');
INSERT INTO public."Visiter" VALUES ('44877665-3b7c-467f-b660-fbae80756b9f', 'visiter07@gmail.com', '7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c', '林雅婷', 'female', '0991021795', true, false, '2026-08-17 17:42:00', '2026-08-17 17:42:00');
INSERT INTO public."Visiter" VALUES ('ca01ed98-e13a-4d01-ae47-142329c61bed', 'visiter08@gmail.com', '7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c', '張美玲', 'female', '0924916374', true, true, '2026-08-17 17:42:00', '2026-08-17 17:42:00');
INSERT INTO public."Visiter" VALUES ('d2d0f306-3edb-473c-a76b-b3c79fc3fc2c', 'visiter09@gmail.com', '7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c', '黃詩婷', 'female', '0958810953', false, false, '2026-08-17 17:42:00', '2026-08-17 17:42:00');
INSERT INTO public."Visiter" VALUES ('f2488701-b123-4a25-9832-cfa42bb82144', 'visiter10@gmail.com', '7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c', '李安安', 'other', '0992705532', true, true, '2026-08-17 17:42:00', '2026-08-17 17:42:00');


--
-- Data for Name: Visiter_AI_Preference; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: GavinLou
--



--
-- Name: Park_Network_id_seq; Type: SEQUENCE SET; Schema: public; Owner: GavinLou
--

SELECT pg_catalog.setval('public."Park_Network_id_seq"', 118, true);


--
-- Name: Park_Network_vertices_pgr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: GavinLou
--

SELECT pg_catalog.setval('public."Park_Network_vertices_pgr_id_seq"', 116, true);


--
-- PostgreSQL database dump complete
--

