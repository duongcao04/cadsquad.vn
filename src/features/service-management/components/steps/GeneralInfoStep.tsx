import {
    Button,
    Card,
    ListBox,
    Select,
    Separator,
    Spinner,
    Tabs,
    TextArea,
} from '@heroui/react'
import { ArrowRight, Search, Settings2 } from 'lucide-react'

import { TServiceType } from '../../../../types'
import MediaUploader from '../MediaUploader'

type GeneralInfoStep = {
    activeLang: string
    formData: any
    handleTranslationChange: (title: string, value: string) => void
    setFormData: any
    setStep: (step: string) => void
    serviceTypes: TServiceType[]
}
export function GeneralInfoStep({
    activeLang,
    formData,
    handleTranslationChange,
    setFormData,
    setStep,
    serviceTypes,
}: GeneralInfoStep) {
    return (
        <div className="flex flex-col xl:flex-row gap-6 animate-in fade-in duration-300 w-full flex-1">
            <Card className="flex-1 border-none">
                <Card.Content className="p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Basic Information ({activeLang})
                    </h2>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-foreground">Service Title <span className="text-danger">*</span></label>
                            <input
                                placeholder="e.g. Web Development"
                                value={formData.translations[activeLang].title}
                                onChange={(e) =>
                                    handleTranslationChange('title', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-foreground">URL Slug <span className="text-danger">*</span></label>
                            <input
                                placeholder="e.g. web-development"
                                value={formData.translations[activeLang].slug}
                                onChange={(e) =>
                                    handleTranslationChange('slug', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-foreground">Short Description <span className="text-danger">*</span></label>
                            <TextArea
                                placeholder="Used for cards and lists..."
                                value={formData.translations[activeLang].shortDescription}
                                onChange={(e) =>
                                    handleTranslationChange('shortDescription', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary min-h-[80px] text-base"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-foreground">Full Description <span className="text-danger">*</span></label>
                            <TextArea
                                placeholder="Detailed description of the service..."
                                value={formData.translations[activeLang].description}
                                onChange={(e) =>
                                    handleTranslationChange('description', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary min-h-[120px] text-base"
                            />
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-end">
                        <Button
                            variant="secondary"
                            onPress={() => setStep('content')}
                            className="font-medium shadow-md shadow-secondary/20 px-8"
                            size="lg"
                        >
                            Continue to Content
                            <ArrowRight size={16} />
                        </Button>
                    </div>
                </Card.Content>
            </Card>

            <Card className="xl:w-[450px] shrink-0 border-none h-fit">
                <Tabs>
                    <Tabs.List className="gap-6 w-full relative rounded-none p-0 border-b border-divider px-6">
                        <Tabs.Tab id="settings" className="max-w-fit px-0 h-14">
                            <div className="flex items-center gap-2">
                                <Settings2 size={16} /> Global Settings
                            </div>
                        </Tabs.Tab>
                        <Tabs.Tab id="seo" className="max-w-fit px-0 h-14">
                            <div className="flex items-center gap-2">
                                <Search size={16} /> Localized SEO
                            </div>
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel id="settings" className="p-6 bg-default-50">
                        <div className="space-y-8">
                            <div className="space-y-5">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-foreground">Order Number</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 1"
                                        value={formData.orderNumber}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                orderNumber: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-foreground">Service Type</label>
                                    <Select
                                        selectedKey={formData.serviceTypeId || null}
                                        onSelectionChange={(key) =>
                                            setFormData({
                                                ...formData,
                                                serviceTypeId: key as string,
                                            })
                                        }
                                    >
                                        <Select.Trigger className="w-full bg-default-100 border border-default-200">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                {serviceTypes.map((st) => (
                                                    <ListBox.Item
                                                        key={st.id}
                                                        id={st.id.toString()}
                                                    >
                                                        {
                                                            st.translations.find(
                                                                (tl) => tl.language === 'EN'
                                                            )?.displayName
                                                        }
                                                    </ListBox.Item>
                                                ))}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-foreground pb-3">
                                    Media Assets
                                </span>
                                <div className="grid grid-cols-2 gap-4">
                                    <MediaUploader
                                        label="Vertical Thumbnail"
                                        value={formData.verticalThumbnailUrl}
                                        onChange={(url) =>
                                            setFormData({
                                                ...formData,
                                                verticalThumbnailUrl: url,
                                            })
                                        }
                                    />
                                    <MediaUploader
                                        label="Horizontal Thumbnail"
                                        value={formData.horizontalThumbnailUrl}
                                        onChange={(url) =>
                                            setFormData({
                                                ...formData,
                                                horizontalThumbnailUrl: url,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel id="seo" className="p-6 bg-default-50">
                        <div className="space-y-6">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-foreground">SEO Title ({activeLang})</label>
                                <input
                                    placeholder="Optimal: 50-60 chars"
                                    value={formData.translations[activeLang].seoTitle}
                                    onChange={(e) =>
                                        handleTranslationChange('seoTitle', e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-foreground">SEO Description ({activeLang})</label>
                                <TextArea
                                    placeholder="Optimal: 150-160 chars"
                                    value={formData.translations[activeLang].seoDescription}
                                    onChange={(e) =>
                                        handleTranslationChange('seoDescription', e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary min-h-[100px] text-base"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-foreground">Keywords ({activeLang})</label>
                                <input
                                    placeholder="Comma separated..."
                                    value={formData.translations[activeLang].seoKeywords}
                                    onChange={(e) =>
                                        handleTranslationChange('seoKeywords', e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                                />
                            </div>
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </Card>
        </div>
    )
}
