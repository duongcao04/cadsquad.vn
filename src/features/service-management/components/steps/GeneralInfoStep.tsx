import {
    Button,
    Card,
    CardBody,
    Divider,
    Input,
    Select,
    SelectItem,
    Tab,
    Tabs,
    Textarea,
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
            <Card shadow="sm" radius="lg" className="flex-1 border-none">
                <CardBody className="p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Basic Information ({activeLang})
                    </h2>
                    <div className="flex flex-col gap-6">
                        <Input
                            label="Service Title"
                            placeholder="e.g. Web Development"
                            variant="flat"
                            labelPlacement="outside"
                            value={formData.translations[activeLang].title}
                            onChange={(e) =>
                                handleTranslationChange('title', e.target.value)
                            }
                            isRequired
                            radius="lg"
                            size="lg"
                        />
                        <Input
                            label="URL Slug"
                            placeholder="e.g. web-development"
                            variant="flat"
                            labelPlacement="outside"
                            value={formData.translations[activeLang].slug}
                            onChange={(e) =>
                                handleTranslationChange('slug', e.target.value)
                            }
                            isRequired
                            radius="lg"
                            size="lg"
                        />
                        <Textarea
                            label="Short Description"
                            placeholder="Used for cards and lists..."
                            variant="flat"
                            labelPlacement="outside"
                            minRows={2}
                            value={
                                formData.translations[activeLang]
                                    .shortDescription
                            }
                            onChange={(e) =>
                                handleTranslationChange(
                                    'shortDescription',
                                    e.target.value
                                )
                            }
                            isRequired
                            radius="lg"
                            size="lg"
                        />
                        <Textarea
                            label="Full Description"
                            placeholder="Detailed description of the service..."
                            variant="flat"
                            labelPlacement="outside"
                            minRows={4}
                            value={
                                formData.translations[activeLang].description
                            }
                            onChange={(e) =>
                                handleTranslationChange(
                                    'description',
                                    e.target.value
                                )
                            }
                            isRequired
                            radius="lg"
                            size="lg"
                        />
                    </div>
                    <Divider className="my-4" />
                    <div className="flex justify-end">
                        <Button
                            color="secondary"
                            endContent={<ArrowRight size={16} />}
                            onClick={() => setStep('content')}
                            className="font-medium shadow-md shadow-secondary/20 px-8"
                            radius="lg"
                            size="lg"
                        >
                            Continue to Content
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Card
                shadow="sm"
                radius="lg"
                className="xl:w-[450px] shrink-0 border-none h-fit"
            >
                <Tabs
                    fullWidth
                    size="md"
                    variant="underlined"
                    color="secondary"
                    classNames={{
                        tabList:
                            'gap-6 w-full relative rounded-none p-0 border-b border-divider px-6',
                        tab: 'max-w-fit px-0 h-14',
                        panel: 'p-6 bg-default-50',
                    }}
                >
                    <Tab
                        key="settings"
                        title={
                            <div className="flex items-center gap-2">
                                <Settings2 size={16} /> Global Settings
                            </div>
                        }
                    >
                        <div className="space-y-8">
                            <div className="space-y-5">
                                <Input
                                    type="number"
                                    label="Order Number"
                                    placeholder="e.g. 1"
                                    variant="flat"
                                    labelPlacement="outside"
                                    value={formData.orderNumber}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            orderNumber: e.target.value,
                                        })
                                    }
                                    radius="lg"
                                />
                                <Select
                                    label="Service Type"
                                    placeholder="Select a category"
                                    variant="flat"
                                    disallowEmptySelection
                                    labelPlacement="outside"
                                    selectedKeys={
                                        formData.serviceTypeId
                                            ? [
                                                  formData.serviceTypeId.toString(),
                                              ]
                                            : []
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            serviceTypeId: e.target.value,
                                        })
                                    }
                                    radius="lg"
                                >
                                    {serviceTypes.map((st) => (
                                        <SelectItem
                                            key={st.id.toString()}
                                            textValue={
                                                st.translations.find(
                                                    (tl) => tl.language === 'EN'
                                                )?.displayName
                                            }
                                        >
                                            {
                                                st.translations.find(
                                                    (tl) => tl.language === 'EN'
                                                )?.displayName
                                            }
                                        </SelectItem>
                                    ))}
                                </Select>
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
                    </Tab>
                    <Tab
                        key="seo"
                        title={
                            <div className="flex items-center gap-2">
                                <Search size={16} /> Localized SEO
                            </div>
                        }
                    >
                        <div className="space-y-6">
                            <Input
                                label={`SEO Title (${activeLang})`}
                                placeholder="Optimal: 50-60 chars"
                                variant="flat"
                                labelPlacement="outside"
                                value={
                                    formData.translations[activeLang].seoTitle
                                }
                                onChange={(e) =>
                                    handleTranslationChange(
                                        'seoTitle',
                                        e.target.value
                                    )
                                }
                                radius="lg"
                            />
                            <Textarea
                                label={`SEO Description (${activeLang})`}
                                placeholder="Optimal: 150-160 chars"
                                variant="flat"
                                labelPlacement="outside"
                                minRows={4}
                                value={
                                    formData.translations[activeLang]
                                        .seoDescription
                                }
                                onChange={(e) =>
                                    handleTranslationChange(
                                        'seoDescription',
                                        e.target.value
                                    )
                                }
                                radius="lg"
                            />
                            <Input
                                label={`Keywords (${activeLang})`}
                                placeholder="Comma separated..."
                                variant="flat"
                                labelPlacement="outside"
                                value={
                                    formData.translations[activeLang]
                                        .seoKeywords
                                }
                                onChange={(e) =>
                                    handleTranslationChange(
                                        'seoKeywords',
                                        e.target.value
                                    )
                                }
                                radius="lg"
                            />
                        </div>
                    </Tab>
                </Tabs>
            </Card>
        </div>
    )
}
