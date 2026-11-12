<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create or Update Admin User
        User::updateOrCreate(
            ['email' => 'admin@raajis.com'],
            [
                'name' => 'Raaji Admin',
                'password' => Hash::make('Admin@12345'),
            ]
        );

        // 2. Initial Sample Articles
        $posts = [
            [
                'title' => 'The Lost Art of Pindi Vantalu: Why Handcrafted Telugu Snacks Matter',
                'slug' => 'lost-art-of-pindi-vantalu',
                'category' => 'Heritage & Culture',
                'date' => '2026-02-18',
                'readingTime' => '4 min read',
                'author' => "Raaji's Kitchen",
                'imageFilename' => 'blogs/story-preparation.png',
                'excerpt' => 'In an age of automated factory conveyor belts, discover why Telugu homes still revere the slow, patient craft of hand-shaped Pindi Vantalu.',
                'tags' => ['Pindi Vantalu', 'Heritage', 'Handmade', 'Telugu Culture'],
                'featured' => true,
                'content' => '<h2>A Legacy Measured in Patience</h2><p>Every Telugu family holds a cherished memory of festival mornings: the gentle rhythmic sizzle of fresh cold-pressed oil in heavy iron kadai, the fragrance of roasted sesame and fresh curry leaves filling the verandah, and grandmother carefully guiding dough into intricate coils on clean cotton cloths.</p><h2>Why Machine-Made Can Never Replace Touch</h2><p>Traditional Pindi Vantalu (flour savouries and sweets) require delicate moisture management that machines simply cannot replicate. The ratio of freshly milled raw rice flour, the exact temperature of the dough when hand-kneaded with warm water and pure butter, and the sensitivity of hand pressure when piping Sakinalu or pressing Chekkalu are skills honed over decades.</p><h2>Our Promise to the Next Generation</h2><p>At Raaji’s, we believe that convenience should never come at the expense of culture. By continuing to craft each batch by hand in Khammam, using the same brass presses and heirloom recipes, we ensure that modern children experience the true, unadulterated crunch that their grandparents loved.</p>',
            ],
            [
                'title' => 'Cold-Pressed Oils vs Refined Oils: The Secret to Wholesome Crispiness',
                'slug' => 'cold-pressed-oils-secret-crispiness',
                'category' => 'Ingredients & Health',
                'date' => '2026-02-05',
                'readingTime' => '5 min read',
                'author' => 'Culinary Team',
                'imageFilename' => 'blogs/story-frying.png',
                'excerpt' => 'Why we choose traditional cold-pressed peanut and sesame oils instead of ultra-processed commercial vegetable oils.',
                'tags' => ['Cold-Pressed', 'Health', 'Purity', 'Nutrition'],
                'featured' => false,
                'content' => '<h2>The Chemistry of Authentic Crunch</h2><p>Walk into any modern supermarket, and most packaged snacks are fried in industrially processed palm or hybrid oils stripped of nutrients, deodorized at high temperatures, and loaded with anti-foaming agents. The result is a heavy, greasy film that lingers on the tongue.</p><h2>The Wooden Ghani (Kaluva) Difference</h2><p>Traditional cold-pressed (Gaani) oils are extracted by gently crushing sun-dried oilseeds at low temperatures without chemical solvents. This preserves natural antioxidants, vitamin E, and characteristic nutty aromas that infuse directly into the snack as it fries.</p><h2>Lighter on the Stomach, Deeper in Flavor</h2><p>Because cold-pressed oils do not absorb into food at excessive rates when maintained at proper thermodynamic frying curves, our snacks remain exceptionally dry, light, and digestible. You enjoy the festive crunch without the post-snack lethargy.</p>',
            ],
            [
                'title' => 'Ariselu & Sakinalu: The Sacred Chemistry of Sankranti Flavors',
                'slug' => 'ariselu-sankranti-symbolism',
                'category' => 'Festivals',
                'date' => '2026-01-14',
                'readingTime' => '6 min read',
                'author' => "Raaji's Kitchen",
                'imageFilename' => 'blogs/story-ingredients.png',
                'excerpt' => 'The harvest festival of Sankranti is incomplete without freshly harvested paddy and newly tapped sugarcane jaggery.',
                'tags' => ['Sankranti', 'Ariselu', 'Festive Traditions', 'Telangana'],
                'featured' => false,
                'content' => '<h2>The First Harvest Offering</h2><p>In Telugu agrarian culture, Sankranti marks the celebration of abundance. The new harvest of wet rice (Kotha Biyyam) and unrefined golden jaggery (Bellam) unite to create Ariselu—a sweet dish so venerable it has been offered at temples for over a thousand years.</p><h2>The Precision of Bellam Paakam</h2><p>Making Ariselu is an exacting culinary science. The jaggery syrup must achieve the elusive "Muthyaala Paakam" (pearl consistency), where a drop of syrup dropped into cold water holds its shape into a soft, malleable pearl. Add the pounded rice flour seconds too late, and the dough turns brittle; too early, and it dissolves in the oil.</p><h2>Sakinalu: The Telangana Jewel</h2><p>Concurrently, across Telangana villages, women gather around large white sheets to spiral concentric circles of raw rice dough mixed with omam (ajwain) and sesame seeds. No oil is used in the dough—only moisture and deft finger work. The result is pure, earthy crunch.</p>',
            ],
            [
                'title' => 'Bellam & Pure Ghee: Ancient Ayurvedic Wisdom in Traditional Telugu Sweets',
                'slug' => 'bellam-and-ghee-ayurvedic-wisdom',
                'category' => 'Ingredients & Health',
                'date' => '2025-12-28',
                'readingTime' => '4 min read',
                'author' => 'Heritage Nutrition',
                'imageFilename' => 'blogs/story-packing.png',
                'excerpt' => 'Why traditional sweets crafted with chemical-free jaggery and bilona ghee are celebrated as nourishing winter elixirs.',
                'tags' => ['Ayurveda', 'Jaggery', 'Pure Ghee', 'Sunnundalu'],
                'featured' => false,
                'content' => '<h2>Sweetness Without the Sugar Crash</h2><p>Refined white sugar creates rapid spikes in blood glucose and depletes the body of essential minerals. In contrast, unrefined jaggery (Bellam) retains vital iron, magnesium, and potassium, acting as a natural digestive tonic after heavy festive meals.</p><h2>The Warming Power of Cow Ghee</h2><p>Ayurveda categorizes pure ghee as "Sattvic" and a potent catalyst (Yogavahi) that carries nutrients deep into bodily tissues. When paired with protein-rich roasted urad dal in Bellam Sunnundalu, it builds immunity and strengthens joints during cooler winter months.</p><h2>Zero Preservatives, Pure Wholesomeness</h2><p>We deliberately eschew artificial stabilizers, milk solids, or added shelf-life chemicals. What you taste is simply pure slow-roasted dal, melted country ghee, and unadulterated jaggery.</p>',
            ],
            [
                'title' => 'From Khammam with Love: Why Small Batches Protect Homestyle Flavor',
                'slug' => 'from-khammam-with-love',
                'category' => 'Heritage & Culture',
                'date' => '2025-12-10',
                'readingTime' => '3 min read',
                'author' => "Raaji's Kitchen",
                'imageFilename' => 'blogs/story-scenery.png',
                'excerpt' => 'A look inside our Khammam kitchen where regional recipes from Telangana and Coastal Andhra meet with uncompromising love.',
                'tags' => ['Khammam', 'Our Story', 'Small Batch', 'Telangana'],
                'featured' => false,
                'content' => '<h2>The Crossroads of Deccan Flavors</h2><p>Khammam holds a unique position on the culinary map: nestled where Telangana’s bold, spicy rural traditions harmonize with the subtle rice craftsmanship of Coastal Andhra. This cross-cultural richness is woven into every Raaji’s recipe.</p><h2>The Batch Size Rule</h2><p>When food companies scale up to multi-ton vat production, recipes must be altered. Emulsifiers are introduced, baking soda is overdosed to maintain puffiness, and salt is boosted to mask stale fats. By maintaining small batch sizes of under 15 kilograms, we preserve the exact same texture your mother achieved in her kitchen.</p><h2>Connecting the Diaspora Back to Their Roots</h2><p>Whether shipping to students missing home in Hyderabad or families celebrating weddings in the USA, our packages carry the fragrant reassurance that home is never more than a crunch away.</p>',
            ],
            [
                'title' => 'The 4 PM Ritual: Perfect Tea Pairings with Traditional Telugu Savouries',
                'slug' => 'chai-and-chekkalu-pairing-guide',
                'category' => 'Traditional Recipes',
                'date' => '2025-11-22',
                'readingTime' => '4 min read',
                'author' => 'Culinary Team',
                'imageFilename' => 'blogs/story-preparation.png',
                'excerpt' => 'Elevate your evening teatime with curated pairings of Irani chai, masala tea, and handcrafted Telugu bites.',
                'tags' => ['Teatime', 'Snack Guide', 'Chekkalu', 'Evening Snack'],
                'featured' => false,
                'content' => '<h2>The Sacred 4 PM Pause</h2><p>Across Telugu households, 4:00 PM is when work ceases, brass tumblers of steaming tea are poured from height, and brass storage tins (Dabbalu) are opened to reveal a golden assortment of savoury delights.</p><h2>The Crispy Harmony Guide</h2><p>For strong ginger tea (Allam Chai), pair with cumin-rich Pappu Chekkalu—the earthy chana dal crunch cuts right through the fiery ginger. For rich Irani dum tea, opt for delicate Karapusa or sesame-loaded Pappu Chekodi for a satisfying contrast of sweet milky warmth and fiery spice.</p><h2>Mindful Snacking</h2><p>Rather than reaching for ultra-processed extruded potato chips, a handful of nutrient-dense rice and pulse savouries delivers sustained energy and wholesome satiety through your evening.</p>',
            ],
        ];

        foreach ($posts as $post) {
            Blog::updateOrCreate(
                ['slug' => $post['slug']],
                $post
            );
        }
    }
}
