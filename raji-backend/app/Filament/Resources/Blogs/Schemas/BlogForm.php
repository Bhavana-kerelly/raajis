<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    // Main Content Column (Left - 2 Columns)
                    Group::make()->schema([
                        Section::make('Article Content')->schema([
                            TextInput::make('title')
                                ->label('Post Title')
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(function ($state, callable $set, string $operation) {
                                    if ($operation === 'create') {
                                        $set('slug', Str::slug($state));
                                    }
                                }),

                            TextInput::make('slug')
                                ->label('URL Slug')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->helperText('Unique URL identifier (auto-generated from title).'),

                            RichEditor::make('content')
                                ->label('Article Body')
                                ->required()
                                ->fileAttachmentsDisk('public')
                                ->fileAttachmentsDirectory('blogs/body-attachments')
                                ->fileAttachmentsVisibility('public')
                                ->toolbarButtons([
                                    'attachFiles', 'blockquote', 'bold', 'bulletList',
                                    'codeBlock', 'h2', 'h3', 'italic', 'link',
                                    'orderedList', 'redo', 'strike', 'underline', 'undo'
                                ])
                                ->columnSpanFull(),

                            Textarea::make('excerpt')
                                ->label('Short Excerpt / Summary')
                                ->rows(3)
                                ->helperText('Shown on blog cards and search engine results.')
                                ->columnSpanFull(),
                        ]),
                    ])->columnSpan(2),

                    // Metadata Sidebar (Right - 1 Column)
                    Group::make()->schema([
                        Section::make('Publishing Details')->schema([
                            DatePicker::make('date')
                                ->label('Publish Date')
                                ->default(now()->toDateString()),

                            TextInput::make('author')
                                ->label('Author Name')
                                ->default("Raaji's Kitchen"),

                            TextInput::make('category')
                                ->label('Category')
                                ->placeholder('e.g. Heritage & Culture'),

                            TextInput::make('readingTime')
                                ->label('Reading Time')
                                ->placeholder('e.g. 5 min read'),

                            Toggle::make('featured')
                                ->label('Featured Article')
                                ->helperText('Promote this article to the top of homepage/blog.'),

                            TagsInput::make('tags')
                                ->label('Tags')
                                ->separator(','),

                            FileUpload::make('imageFilename')
                                ->label('Cover Image')
                                ->image()
                                ->imageEditor()
                                ->disk('public')
                                ->directory('blogs')
                                ->visibility('public')
                                ->helperText('Recommended size: 1200x630 (JPEG/WebP)'),
                        ]),
                    ])->columnSpan(1),
                ]),
            ]);
    }
}
